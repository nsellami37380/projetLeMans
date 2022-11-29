import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-form-team',
  templateUrl: './form-team.component.html',
  styleUrls: ['./form-team.component.scss']
})
export class FormTeamComponent implements OnInit {

  team: Team = new Team(0, '', '', 0, '', [], [], []);
  url: string = '';
  pilotList!: Pilot[];
  id: number = 0;
  textBtnSubmit: string = "Ajouter";
  file!: File;

  constructor(
    private leMans24S: LeMan24Service,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pilotList = this.leMans24S.getPilotList();

    this.route.paramMap.subscribe((param: ParamMap) => {

      if (param.get('id') != null) {
        this.id = parseInt(param.get('id') as string);
        this.textBtnSubmit = "Modifier";
        this.team = this.leMans24S.getTeamById(this.id);
        this.url = this.team.logoUrl;
      }
    })
  }

  selectfile(event: any): void {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      this.team.logoUrl = '/assets/' + this.file.name;
    }
  }

  addTeam(): void {
    if (this.team.logoUrl) {
      if (this.file) this.leMans24S.uploadFile(this.file);
      if (this.id != 0) {
        this.leMans24S.updateTeam(this.team);
      } else {
        this.leMans24S.addTeam(this.team);
      }
    }

  }

  hideImage() {
    document.getElementById("image")!.style.display="none";
  }

  getPlaceholder(event: Event) {
    (event.target as HTMLImageElement).src="/assets/team-img-main.png"
   }
}
