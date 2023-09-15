# Mainstay LN payments

Config will include c-lightning REST endpoint and macaroon (auth token). 

A new database table: `Tokens` will be created to keep track of issued tokens and their payment status. 

The `ClientDetails` table will have a new column for `expiry_date` (after this date, the `/commitment/send` route will no longer work). 

## Paying for for access tokens via LN

`GET /token/init/{value}`

Response:

```
{
  "lightning_invoice": {
    "bolt11": "string",
    "expires_at": 0,
    "payment_hash": "string"
  },
  "token_id": "string",
  "value": 0
}
```

This function will generate random `token_id` and call `v1/invoice/genInvoice` with label `token_id` on c-lightning REST to generate `lightning_invoice`. 

## Verify confirmed and spent status of pod token

`GET /token/verify/{token_id}`

Response:

```
{
  "amount": 0,
  "confirmed": true
}
```

This function will call `v1/invoice/listInvoices?label=token_id` and check the if the invoice has been paid. If it has, the `Tokens` table will be updated with the value. 

## Use token to pay for an access slot

`POST /spendtoken`

Body parameter

```
{
  "token_id": "string",
  "slot_id": 0
}
```
This function will check the `Tokens` table to check the value of the `token_id`. If sufficient, will then either update slot user data or create a new slot. 

If `slot_id` is 0, then this function will create a new row in `ClientDetails` with the next available slot ID (`client_position`) and an `expiry_date` set an amount of time in the future set by the `value` and the `fee_rate`

If `slot_id` is an existing slot, the row in `ClientDetails` will be updated with a new `expiry_date` (time added dependent on the `value` and the `fee_rate`). 

## Check expiry date

`GET /slotexpiry/{slot_id}`

This will return the `expiry_date` for the specified `slot_id`. 

## Check Fee rate

`GET /feerate`

This will return the `fee_rate_per_month_in_msat`.

# Website 

The 'Sign Up' button on the main mainstay.xyz site to be replaced with 'Join'

This will open a pop-up (as it does currently) with the title 'Create slot'. Below this will be the text: "Pay with lightning to reserve a unique proof-of-publication slot for fee_rate a month". 
Then there will be a drop down menu for '1 month', '2 months', '3 months' and custom. Custom will allow user to enter any number of months. 
Once the time is selected the value is calculated from this and fee_rate. 
`GET /token/init/{value}` is then called, and the bolt11 invoice is displayed. 

At the bottom of the pop-up, there is a 'Verify' button. This calls `GET /token/verify/{token_id}`. If `"confirmed": false` then then pop-up will remain open, and 'Payment not received' message displayed. If `"confirmed": true`, then a new pop-up will appear with the slot details. `POST /spendtoken` is called, and the `token_id` and `slot_id` is displayed. `GET /slotexpiry/{slot_id}` is called and the expiry date is displayed. 
The text below this: "Save these details to commit data and generate proofs" with a 'Close' button to close the pop-up.

When trying to send the commitment, if the slot's expiration date precedes the current date, a pop-up will appear, displaying the message 'Token has expired, renew it by making a payment for the slot.' Additionally, a modal window titled 'Pay for existing slot' will appear, featuring a dropdown menu for selecting the number of months. Upon choosing a duration, the invoice will be presented for payment. After completing the payment, the expiration date will be extended, allowing the user to proceed with sending the commitment.
