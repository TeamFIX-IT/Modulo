﻿using System.Text.Json.Serialization;

namespace API.Models
{
    public class BookingDetails
    {
        public int Id { get; set; }

        public int User { get; set; }

        public ClassRoom ClassRoom { get; set; }

        public int ClassRoomId { get; set; }

        public DateTime Date { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime => StartTime.AddHours(1);


    }
}