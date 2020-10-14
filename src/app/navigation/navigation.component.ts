import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() public parentData
  public isHome: boolean = false;
  public isCars: boolean = false;
  public isProfile: boolean = false;
  public isLogin: boolean = false;
  public isSignUp: boolean = false;
  public isAdmin: boolean = false;
  constructor() { }

  ngOnInit(): void {
    // switch (this.parentData) {
    //   case 'Home':
    //     this.isHome = true
    //     break
    //   case 'Cars':
    //     this.isCars = true
    //     break
    //   case 'Profile':
    //     this.isProfile = true
    //     break
    //   case 'Login':
    //     this.isLogin = true
    //     break
    //   case 'SignUp':
    //     this.isSignUp = true
    //     break
    //   case 'Admin':
    //     this.isAdmin = true
    //     break
    //   default: break
    // }
  }
  myFunction() {
    var x = document.getElementById("myTopNav");
    x.classList.toggle('responsive')
  }
}
