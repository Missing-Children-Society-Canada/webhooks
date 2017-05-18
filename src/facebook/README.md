# Facebook Webhook Integration

## Setup

### Azure Function
1. Create an Azure Function for this function

### Facebook Integration

1. Log into the Azure Child Finder app on FB: https://developers.facebook.com/apps/189849514869492
1. Click `+ Add Product` > `Web Hooks` > `Get Started`
1. Generate a unique token/guid/security string and configure it in the application settings for this function using the key `FB_VERIFY_TOKEN`
  * Example: you can use the `CodeIgniter Encryption Keys` from http://randomkeygen.com/
1. Under `User` click `Subscribe to this topic`
1. Provide the HTTPS URL for the above Azure Function & the token generated previsouly
1. Be sure to enable `Include Values`
  * **Note**: If you do not enable this, no values for the posts will be sent to the callback URL (aka our Azure Function) 
1. Click `Verify & Save`
1. Under `Subscriptions` scroll down to `feed` & click `Subscribe`