import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teste',
  templateUrl: './redirected.component.html',
  styleUrls: ['./redirected.component.scss']
})
export class RedirectedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.router.navigate(['/reservas']);
    }, 2000);
  }

}
