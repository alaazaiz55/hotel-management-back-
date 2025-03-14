package com.example.hotel.services;

import com.example.hotel.dto.LoginRequest;
import com.example.hotel.dto.Response;
import com.example.hotel.model.User;
import com.example.hotel.repository.UserRepository;
import com.example.hotel.security.JWTUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;



    public Response register(User user) {

        user.setName(user.getName());
        user.setEmail(user.getEmail());
        user.setPassword(user.getPassword());
        user.setPhoneNumber(user.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRpassword(passwordEncoder.encode(user.getRpassword()));
        user.setRole(user.getRole());

        // Sauvegarde de l'utilisateur
        User savedUser = userRepository.save(user);

        // Génération des tokens
        String jwtToken = jwtUtils.generateToken(user);
       // String refreshToken = jwtUtils.generateRefreshToken(user);
      //  saveUserToken(savedUser, jwtToken);

        // Retourner la réponse d'authentification
        Response authResponse = new Response();
       // authResponse.setAccessToken(jwtToken);
        return authResponse;
    }

    public Response login(LoginRequest loginRequest) {

        Response response = new Response();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new IOException("user Not found"));

            var token = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days");
            response.setMessage("successful");

        } catch (IOException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error Occurred During USer Login " + e.getMessage());
        }
        return response;
    }

}
