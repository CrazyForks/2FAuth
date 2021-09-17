<?php

namespace App\Services;

use App\TwoFAccount;
use App\Exceptions\InvalidSecretException;
use App\Exceptions\InvalidOtpParameterException;
use App\Services\Dto\OtpDto;
use App\Services\Dto\TwoFAccountDto;
use OTPHP\TOTP;
use OTPHP\HOTP;
use OTPHP\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class TwoFAccountService
{
    /**
     * 
     */
    private $token;

    /**
     * 
     */
    private array $supportedOtpTypes = [
        "OTPHP\TOTP" => "totp",
        "OTPHP\HOTP" => "hotp"
    ];

    private const IMAGELINK_STORAGE_PATH = 'imagesLink/';
    private const ICON_STORAGE_PATH = 'public/icons/';
    

    public function __construct()
    {
        //$this->token = $otpType === TOTP::create($secret) : HOTP::create($secret);
    }


    /**
     * Creates an account using an otpauth URI
     * 
     * @param string $uri
     * @param bool $saveToDB Whether or not the created account should be saved to DB
     * 
     * @return TwoFAccount The created account
     */
    public function createFromUri(string $uri, bool $saveToDB = true ) : TwoFAccount
    {
        // Instanciate the token
        $this->initTokenWith($uri);

        // Create the account
        $twofaccount = new TwoFAccount;
        $twofaccount->legacy_uri = $uri;
        $this->fillWithToken($twofaccount);
        
        if ( $saveToDB ) $twofaccount->save();

        return $twofaccount;
    }


    /**
     * Creates an account using a list of parameters
     * 
     * @param array $data
     * @param bool $saveToDB Whether or not the created account should be saved to DB
     * 
     * @return TwoFAccount The created account
     */
    public function createFromParameters(array $data, bool $saveToDB = true) : TwoFAccount
    {
        // Instanciate the token
        $this->initTokenWith($data);

        // Create and fill the account
        $twofaccount = new TwoFAccount;
        $twofaccount->legacy_uri = $this->token->getProvisioningUri();
        $twofaccount->icon = Arr::get($data, 'icon', null);
        $this->fillWithToken($twofaccount);
        
        if ( $saveToDB ) $twofaccount->save();

        return $twofaccount;
    }


    /**
     * Updates an account using a list of parameters
     * 
     * @param TwoFAccount $twofaccount The account
     * @param array $data The parameters
     * 
     * @return TwoFAccount The created account
     */
    public function update(TwoFAccount $twofaccount, array $data) : TwoFAccount
    {
        // Instanciate the token
        $this->initTokenWith($data);

        $this->fillWithToken($twofaccount);
        $twofaccount->icon = Arr::get($data, 'icon', null);
        $twofaccount->save();

        if (is_null($twofaccount->icon)) {
            $this->deleteIcon($twofaccount->icon);
        }

        return $twofaccount;
    }


    /**
     * Returns a One-Time Password (with its parameters) for the specified account
     * 
     * @param TwoFAccount|TwoFAccountDto|int|string $data Data defining an account
     * 
     * @return OtpDto an OTP DTO
     * 
     * @throws InvalidSecretException The secret is not a valid base32 encoded string
     */
    public function getOTP($data) : OtpDto
    {
        $this->initTokenWith($data);
        $OtpDto = new OtpDto();
        
        try {
            if ( $this->tokenOtpType() === 'totp' ) {

                $OtpDto->generated_at   = time();
                $OtpDto->password       = $this->token->at($OtpDto->generated_at);
                $OtpDto->valid_for      = $this->token->getParameter('period');
            }
            else if ( $this->tokenOtpType() === 'hotp' ) {

                $counter = $this->token->getCounter();
                $OtpDto->password   = $this->token->at($counter);
                $OtpDto->counter    = $counter + 1;
            }
        }
        catch (\Assert\AssertionFailedException|\Assert\InvalidArgumentException|\Exception|\Throwable $ex) {
            // Currently a secret issue is the only possible exception thrown by OTPHP for this stack
            // so it is Ok to send the corresponding 2FAuth exception.
            // If the token package change it could be necessary to throw a more generic exception.
            throw new InvalidSecretException($ex->getMessage());
        }

        return $OtpDto;
    }


    /**
     * Returns a generated otpauth URI for the specified account
     * 
     * @param TwoFAccount|TwoFAccountDto|int $data Data defining an account
     */
    public function getURI($data) : string
    {
        $this->initTokenWith($data);

        return $this->token->getProvisioningUri();
    }


    /**
     * Delete one or more twofaccounts
     * 
     * @param int|array $ids twofaccount's ids to delete
     */
    public function delete($ids)
    {
        TwoFAccount::destroy($ids);

        // TODO : log the returned value = total count of records deleted
    }



// ########################################################################################################################
// ########################################################################################################################
// ########################################################################################################################
// ########################################################################################################################


    /**
     * Inits the Token
     */
    private function initTokenWith($data) : void
    {
        // init with a TwoFAccount instance
        if ( is_object($data) && get_class($data) === 'App\TwoFAccount' ) {
            $this->initTokenWithTwoFAccount($data);
        }
        // init with a TwoFAccountDto instance
        else if ( is_object($data) && get_class($data) === 'App\Services\Dto\TwoFAccountDto' ) {
            $this->initTokenWithParameters($data);
        }
        // init with an account ID
        else if ( is_integer($data) ) {
            // we should have an ID
            $twofaccount = TwoFAccount::findOrFail($data);
            $this->initTokenWithTwoFAccount($twofaccount);
        }
        // init with an array of property
        else if( is_array($data) ) {
            $dto = $this->mapArrayToDto($data);
            $this->initTokenWithParameters($dto);
        }
        // or with a string that should be an otpauth URI
        else {
            $this->initTokenWithUri($data);
        }
    }


    /**
     * Maps array items to a TwoFAccountDto instance
     * 
     * @param array $array The array to map
     * 
     * @returns TwoFAccountDto
     */
    private function mapArrayToDto($array) : TwoFAccountDto
    {
        $dto = new TwoFAccountDto();

        foreach ($array as $key => $value) {
            $dto->$key = ! Arr::has($array, $key) ?: $value;
        }

        return $dto;
    }



    /**
     * Instanciates the token with a TwoFAccount
     * 
     * @param TwoFAccount $twofaccount
     * 
     * @param bool $usingUri Whether or not the token should be fed with the account uri
     */
    private function initTokenWithTwoFAccount(TwoFAccount $twofaccount, bool $useLegacyUri = false) : void
    {
        if ( $useLegacyUri ) {
            $this->initTokenWithUri($twofaccount->legacy_uri);
        }
        else {
            $dto = new TwoFAccountDto();

            $dto->otp_type              = $twofaccount->otp_type;
            $dto->account               = $twofaccount->account;
            $dto->service               = $twofaccount->service;
            $dto->icon                  = $twofaccount->icon;
            $dto->secret                = $twofaccount->secret;
            $dto->algorithm             = $twofaccount->algorithm;
            $dto->digits                = $twofaccount->digits;

            if ( $twofaccount->period ) $dto->period    = $twofaccount->period;
            if ( $twofaccount->counter ) $dto->counter  = $twofaccount->counter;

            $this->initTokenWithParameters($dto);
        }
    }


    /**
     * Instanciates the token object by parsing an otpauth URI
     * 
     * @throws ValidationException The URI is not a valid otpauth URI
     */
    private function initTokenWithUri(string $uri) : void
    {
        try {
            $this->token = Factory::loadFromProvisioningUri($uri);
        }
        catch (\Assert\AssertionFailedException|\Assert\InvalidArgumentException|\Exception|\Throwable $e) {
            throw ValidationException::withMessages([
                'uri' => __('validation.custom.uri.regex', ['attribute' => 'uri'])
            ]);
        }

        // As loadFromProvisioningUri() accept URI without label (nor account nor service) we check
        // that the account is set
        if ( ! $this->token->getLabel() ) {
            throw ValidationException::withMessages([
                'label' => __('validation.custom.label.required')
            ]);
        }
    }


    /**
     * Instanciates the token object by passing a list of parameters
     * 
     * @throws ValidationException otp type not supported
     * @throws InvalidOtpParameterException invalid otp parameters
     */
    private function initTokenWithParameters(TwoFAccountDto $dto) : void
    {
        // Check OTP type again to ensure the upcoming OTPHP instanciation
        if ( ! in_array($dto->otp_type, $this->supportedOtpTypes, true) ) {
            throw ValidationException::withMessages([
                'otp_type' => __('validation.custom.otp_type.in', ['attribute' => 'otp type'])
            ]);
        }

        try {
            if ( $dto->otp_type === 'totp' ) {
                $this->token = TOTP::create(
                    $dto->secret,
                    $dto->period,
                    $dto->algorithm,
                    $dto->digits,
                );
            }
            else if ( $dto->otp_type === 'hotp' ) {
                $this->token = HOTP::create(
                    $dto->secret,
                    $dto->counter,
                    $dto->algorithm,
                    $dto->digits,
                );
            }

            if ($dto->service) $this->token->setIssuer($dto->service);
            if ($dto->account) $this->token->setLabel($dto->account);
        }
        catch (\Assert\AssertionFailedException|\Assert\InvalidArgumentException|\Exception|\Throwable $ex) {
            throw new InvalidOtpParameterException($ex->getMessage());
        }
        
    }


    /**
     * Fills a TwoFAccount with token's parameters
     */
    private function fillWithToken(TwoFAccount &$twofaccount) : void
    {
        $twofaccount->otp_type      = $this->tokenOtpType();
        $twofaccount->account       = $this->token->getLabel();
        $twofaccount->secret        = $this->token->getSecret();
        $twofaccount->service       = $this->token->getIssuer();
        $twofaccount->algorithm     = $this->token->getDigest();
        $twofaccount->digits        = $this->token->getDigits();
        $twofaccount->period        = $this->token->hasParameter('period') ? $this->token->getParameter('period') : null;
        $twofaccount->counter       = $this->token->hasParameter('counter') ? $this->token->getParameter('counter') : null;

        if ( $this->token->hasParameter('image') ) {
            $twofaccount->icon      = $this->storeTokenImageAsIcon();
        }
    }


    /**
     * Returns the otp_type that matchs the token instance class
     */
    private function tokenOtpType() : string
    {
        return $this->supportedOtpTypes[get_class($this->token)];
    }


    /**
     * Gets the image resource pointed by the token image parameter and store it as an icon
     * 
     * @return string The filename of the stored icon
     */
    private function storeTokenImageAsIcon() : string
    {
        try {
            $remoteImageURL = $this->token->getParameter('image');
            $path_parts = pathinfo($remoteImageURL);
            $newFilename = Str::random(40) . '.' . $path_parts['extension'];
            $imageFile = self::IMAGELINK_STORAGE_PATH . $newFilename;
            $iconFile = self::ICON_STORAGE_PATH . $newFilename;

            Storage::disk('local')->put($imageFile, file_get_contents($remoteImageURL));

            if ( in_array(Storage::mimeType($imageFile), ['image/png', 'image/jpeg', 'image/webp', 'image/bmp']) 
                && getimagesize(storage_path() . '/app/' . $imageFile) )
            {
                // Should be a valid image
                Storage::move($imageFile, $iconFile);
            }
            else {
                Storage::delete($imageFile);
                throw new \Exception;
            }
                
            return $newFilename;
        }
        catch (\Assert\AssertionFailedException|\Assert\InvalidArgumentException|\Exception|\Throwable $ex) {
            // TODO : log the error
        }
    }

    /**
     * Deletes an icon
     * 
     * @param string $filename The icon filename
     */
    private function deleteIcon(string $filename) : void
    {
        Storage::delete('public/icons/' . $filename);
    }
}