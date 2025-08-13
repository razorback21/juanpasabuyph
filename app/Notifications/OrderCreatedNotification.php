<?php

namespace App\Notifications;

use App\Models\Customer;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\HtmlString;

class OrderCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $order;

    public $tries = 2;
    /**
     * Create a new notification instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     * @todo list order items
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Juanpasabuyph - Order Confirmation (' . $this->order->order_number . ')')
            ->greeting('Hello ' . $notifiable->fullname)
            ->line('Thank you for your order! Your order #' . $this->order->order_number . ' has been successfully placed. You can track your order status by visiting our ' . '<a href="' . route('track', $this->order->order_number) . '">website</a>' . ', and we will send you updates as your order progresses.')
            ->line(new HtmlString($this->orderHTML($this->order)))
            ->line('Thank you for shopping at juanpasabuyph.com')
            ->line(new HtmlString("For any questions. Please contact us in our facebook page or email directly to  <a href='mailto:" . config('app.admin_email') . "'>" . config('app.admin_email') . "</a>"));
    }

    public function orderHTML($order)
    {
        $table = '<table style="width: 100%; border-collapse: collapse; margin: 15px 0;">';
        $table .= '<tr style="background-color: #f8f9fa;">';
        $table .= '<th style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">Product</th>';
        $table .= '<th style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">Quantity</th>';
        $table .= '<th style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">Price</th>';
        $table .= '<th style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">Total</th>';
        $table .= '</tr>';

        // Add order items
        foreach ($order->items as $item) {
            $table .= '<tr>';
            $table .= '<td style="padding: 12px; border: 1px solid #dee2e6; text-align: left;">' . $item->product->name . '</td>';
            $table .= '<td style="padding: 12px; border: 1px solid #dee2e6; text-align: center;">' . $item->quantity . '</td>';
            $table .= '<td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₱' . number_format($item->price, 2) . '</td>';
            $table .= '<td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₱' . number_format($item->total, 2) . '</td>';
            $table .= '</tr>';
        }

        // Add order summary
        // $table .= '<tr style="background-color: #f8f9fa;">';
        // $table .= '<td colspan="3" style="padding: 12px; border: 1px solid #dee2e6; text-align: right;"><strong>Subtotal:</strong></td>';
        // $table .= '<td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₱' . number_format($order->subtotal, 2) . '</td>';
        // $table .= '</tr>';

        // if ($order->discount > 0) {
        //     $table .= '<tr style="background-color: #f8f9fa;">';
        //     $table .= '<td colspan="3" style="padding: 12px; border: 1px solid #dee2e6; text-align: right;"><strong>Discount:</strong></td>';
        //     $table .= '<td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">-₱' . number_format($order->discount, 2) . '</td>';
        //     $table .= '</tr>';
        // }

        $table .= '<tr style="background-color: #f8f9fa;">';
        $table .= '<td colspan="3" style="padding: 12px; border: 1px solid #dee2e6; text-align: right;"><strong>Total:</strong></td>';
        $table .= '<td style="padding: 12px; border: 1px solid #dee2e6; text-align: right;">₱' . number_format($order->total, 2) . '</td>';
        $table .= '</tr>';
        $table .= '</table>';
        return $table;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
