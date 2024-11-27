package com.librarysys.digital_library_system.responses;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private long expiresIn;
}
