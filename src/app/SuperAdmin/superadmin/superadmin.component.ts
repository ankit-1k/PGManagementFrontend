import { Component, OnInit } from '@angular/core';
import { SuperadminService } from 'src/app/services/superadmin/superadmin.service';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent implements OnInit {
  allReportList: any[]=[];

  constructor(private reportService:SuperadminService) { }

  ngOnInit(): void {
    this.getReportsDataList()
  }

  getReportsDataList(){
    this.reportService.getReportsDataList().subscribe({
      next:response=>{
        this.allReportList=response.data
        console.log(this.allReportList)
      },
      error:error=>{
        console.log(error)
      }
    })
  }
}
 