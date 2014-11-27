namespace GallerySysteServices.Models
{
    using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

    public class Album
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public int Votes { get; set; }

        public string Comments { get; set; }

        public DateTime CreatedAt { get; set; }

        public virtual ICollection<Picture> Picture { get; set; }

        public virtual User User { get; set; }

        public Album ()
        {
            this.Picture = new HashSet<Picture>();
        }
    }
}
