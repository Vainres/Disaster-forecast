<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserNoti extends Model
{
    use HasFactory;
    protected $table = "notification_user";
    protected $guarded = [];
}