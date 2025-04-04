package com.example.hotel.services;


import com.example.hotel.dto.Response;
import com.example.hotel.model.Room;
import com.example.hotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService {
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Autowired
    private RoomRepository roomRepository;


    public Response addRoom(Room room, byte[] file){

        Response response = new Response();
        Room roomm = new Room();

        roomm.setRoomType(room.getRoomType());
        roomm.setRoomPrice(room.getRoomPrice());
        roomm.setRoomDescription(room.getRoomDescription());
        roomm.setRoomPhoto(file);
        Room rommSaved = roomRepository.save(roomm);

        return response;



    }

    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    public List<Room> getAllRoom(){
        List<Room> rooms=  roomRepository.findAll();
        return rooms;
    }

    public List<Room> getAvailableRoomsByDataAndType(LocalDate inDate,LocalDate outDate, String roomType){

        List<Room> rooms = roomRepository.findAvailableRoomsByDatesAndTypes(inDate , outDate , roomType);
        return rooms;


    }

    public List<Room> getAvailableRoomsByType(String roomType){

        List<Room> rooms = roomRepository.findByRoomType(roomType);
        return rooms;


    }
public Optional<Room> getRoomById(Long id){

        Optional<Room> room = roomRepository.findById(id);
        return room;

}

}
