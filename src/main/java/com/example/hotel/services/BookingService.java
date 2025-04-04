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
        Booking myBooking = bookingRepository.save(booking);
        return response;

    }
}
