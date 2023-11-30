import { registerPayment } from "@/utils/db/register-payment";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);
  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleTimeString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("Event", event?.type);
    // charge.succeeded
    // payment_intent.succeeded
    // payment_intent.created

    switch (event.type) {
      case "charge.succeeded":
        const chargeSucceeded = event.data.object;

        console.log("chargeSucceeded", chargeSucceeded);
        // Then define and call a function to handle the event charge.succeeded
        const response: any = await registerPayment(
          res?.data?.object?.billing_details?.email, // email
          res?.data?.object?.amount, // amount
          JSON.stringify(res), // payment info
          res?.type, // type
          String(timeString), // time
          String(dateTime), // date
          res?.data?.object?.receipt_email, // email
          res?.data?.object?.receipt_url, // url
          JSON.stringify(res?.data?.object?.payment_method_details), // Payment method details
          JSON.stringify(res?.data?.object?.billing_details), // Billing details
          res?.data?.object?.currency // Currency
        );

        if (response?.message === "success") {
          // console.log("response", response);
          return NextResponse.json({ status: "Success", response });
        }

        if (response?.message === "error") {
          // console.log("response", response);
          throw new Error(
            "Sentry Example API Route Error",
            response?.error as any
          );
        }

        return NextResponse.json({
          status: "DB registration didn't work",
          response,
        });

        break;
      case "customer.subscription.created":
        const customerSubscriptionCreated = event.data.object;
        console.log("customerSubscriptionCreated", customerSubscriptionCreated);

        // Then define and call a function to handle the event customer.subscription.created
        break;
      case "customer.subscription.deleted":
        const customerSubscriptionDeleted = event.data.object;
        console.log("customerSubscriptionDeleted", customerSubscriptionDeleted);

        // Then define and call a function to handle the event customer.subscription.deleted
        break;
      case "customer.subscription.paused":
        const customerSubscriptionPaused = event.data.object;
        console.log("customerSubscriptionPaused", customerSubscriptionPaused);

        // Then define and call a function to handle the event customer.subscription.paused
        break;
      case "subscription_schedule.canceled":
        const subscriptionScheduleCanceled = event.data.object;
        console.log(
          "subscriptionScheduleCanceled",
          subscriptionScheduleCanceled
        );

        // Then define and call a function to handle the event subscription_schedule.canceled
        break;
      case "customer.subscription.updated":
        const subscriptionScheduleUpdated = event.data.object;
        console.log("subscriptionScheduleUpdated", subscriptionScheduleUpdated);

        // Then define and call a function to handle the event subscription_schedule.canceled
        break;

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({
      status: "Not charge succeeded",
    });
  } catch (error: any) {
    throw new Error(error?.message);
    return NextResponse.json({ status: "Failed", error });
  }
}
