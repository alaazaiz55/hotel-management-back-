package com.example.hotel.controller;


import com.example.hotel.dto.Response;
import com.example.hotel.model.Booking;
import com.example.hotel.services.BookingService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private  BookingService bookingService; // Injection par constructeur



    @PostMapping("/save/{roomId}/book/{userId}")
    public ResponseEntity<Response> saveBooking(@PathVariable Long roomId,
                                                @PathVariable Long userId,
                                                @RequestBody Booking booking) throws Exception {
        return ResponseEntity.ok(bookingService.saveBooking(roomId, userId, booking));
    }
}
