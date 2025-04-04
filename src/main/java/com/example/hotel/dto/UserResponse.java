package com.example.hotel.dto;

public class UserResponse {
    public UserResponse(String phoneNumber, String name, String email) {
        this.email= email;
        this.PhoneNumber= phoneNumber;
        this.name= name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return PhoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        PhoneNumber = phoneNumber;
    }

    private String name;
    private String PhoneNumber;
    private String email;
}
