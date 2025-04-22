package com.example.hotel.controller;


import com.example.hotel.dto.Response;
import com.example.hotel.model.Room;
import com.example.hotel.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/save")
    public ResponseEntity<Response> saveRoom(@RequestPart("room") Room room,
                                             @RequestPart("file") byte[] file){
        return ResponseEntity.ok(roomService.addRoom(room, file));
    }

    @GetMapping("/type")
    public ResponseEntity<List<String>> getType(){
        return ResponseEntity.ok(roomService.getAllRoomTypes());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Room>> getAll(){
        return ResponseEntity.ok(roomService.getAllRoom());
    }

    @GetMapping("/roomSelec")
    public ResponseEntity<List<Room>> getRommSelec (@RequestParam("dateIn") LocalDate dateIn,
                                                    @RequestParam("dateOut") LocalDate dateOut,
                                                    @RequestParam("roomType") String roomType){

        return ResponseEntity.ok(roomService.getAvailableRoomsByDataAndType(dateIn, dateOut , roomType));


    }
    @GetMapping("/typeRoom/{roomType}")
    public ResponseEntity<List<Room>> getTypeRoom(@PathVariable String roomType){
        return ResponseEntity.ok(roomService.getAvailableRoomsByType(roomType));
    }
    
    @GetMapping("/{roomID}")
    public ResponseEntity<Optional<Room>> getRoomById(@PathVariable Long roomID){
        return ResponseEntity.ok(roomService.getRoomById(roomID));

    }



}
