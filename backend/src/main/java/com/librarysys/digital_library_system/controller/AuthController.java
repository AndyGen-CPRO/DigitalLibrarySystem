package com.librarysys.digital_library_system.controller;

import com.librarysys.digital_library_system.dto.RegisterRequestDTO;
import com.librarysys.digital_library_system.dto.LoginRequestDTO;
import com.librarysys.digital_library_system.model.User;
import com.librarysys.digital_library_system.responses.LoginResponse;
import com.librarysys.digital_library_system.service.AuthService;
import com.librarysys.digital_library_system.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3002")
public class AuthController {
    private final JwtService jwtService;
    private final AuthService authService;

    public AuthController(JwtService jwtService, AuthService authService) {
        this.jwtService = jwtService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequestDTO registerRequestDTO) {
        User registeredUser = authService.register(registerRequestDTO);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginRequestDTO loginRequestDTO) {
        User authenticatedUser = authService.authenticate(loginRequestDTO);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        String role = authenticatedUser.getRole();
        String username = authenticatedUser.getUsername();

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setRole(role);
        loginResponse.setUsername(username);

        return ResponseEntity.ok(loginResponse);
    }
}