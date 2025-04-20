package com.example.hotel.services;


import com.example.hotel.dto.Response;
import com.example.hotel.model.Booking;
import com.example.hotel.model.Room;
import com.example.hotel.model.User;
import com.example.hotel.repository.BookingRepository;
import com.example.hotel.repository.RoomRepository;
import com.example.hotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;
    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();


    public Response saveBooking(Long roomId, Long userId,Booking booking) throws Exception {
         Response response = new Response();

        Room room = roomRepository.findById(roomId).orElseThrow(() -> new Exception("Room Not Found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new IOException("User Not Found"));


        // Booking booking = new Booking();
        booking.setNumOfAdults(booking.getNumOfChildren());
        booking.setNumOfChildren(booking.getNumOfChildren());
        booking.setCheckInDate(booking.getCheckInDate());
        booking.setCheckOutDate(booking.getCheckOutDate());
        booking.setUser(user);
        booking.setRoom(room);
        booking.setRoom(booking.getRoom());
        String bookingConfirmationCode = generateRandomConfirmationCode(10);
        booking.setBookingConfirmationCode(bookingConfirmationCode);
        Booking myBooking = bookingRepository.save(booking);
        return response;

    }

    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

}
