﻿namespace API.DTOs
{
    public class BookingDTO
    {

        public int User { get; set; } = 1;

        public int ClassRoomId { get; set; } = 3;

        public DateTime Date { get; set; } = DateTime.Now;

        public DateTime StartTime { get; set; } = DateTime.Now;


    }
}