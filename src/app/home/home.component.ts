import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public slideIndex: number = 1;
  constructor() { }

  ngOnInit(): void {
    this.showSlide(this.slideIndex);
  }

  plusSlide(n: number) {
    console.log("plus")
    this.showSlide(this.slideIndex += n)
  }

  showSlide(n: number) {
    var i;
    var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[this.slideIndex - 1].style.display = "block";
  }
}
