<?php

namespace App\Enums;

enum UserStatus: string
{
    case ACTIVE = "ACTIVE";
    case BLOCKED = 'BLOCKED';
}
