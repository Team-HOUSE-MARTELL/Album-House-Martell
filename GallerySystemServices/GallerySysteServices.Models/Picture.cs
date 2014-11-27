namespace GallerySysteServices.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Picture
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Url { get; set; }

        public int Votes { get; set; }

        public string Comments { get; set; }

        public string Description { get; set; }

        public string Title { get; set; }

        public DateTime CreateDate { get; set; }

        [Required]
        public virtual Album Album { get; set; }

        public Picture ()
        {

        }
    }
}
