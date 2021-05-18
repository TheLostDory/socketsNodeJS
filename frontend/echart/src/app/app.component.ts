import { Component } from '@angular/core';
import { io } from "socket.io-client";
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'echart';
  socket = io("http://localhost:3000", {
    transports : ['websocket']
  });

  deepCopyFunction(inObject) {
    let outObject;
    let value;
    let key;
    if (typeof inObject !== 'object' || inObject === null) {
    return inObject; // Return the value if inObject is not an object
        }
// Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
// tslint:disable-next-line: forin
    for (key in inObject) {
    value = inObject[key];
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = (typeof value === 'object' && value !== null) ? this.deepCopyFunction(value) : value;
}
    return outObject;
}
 options ={
      xAxis: {
      type: 'category'
      },
       yAxis: {
          type: 'value'
        },
                      series: [{
                          smooth: true,
                          data: [],
                          type: 'line'
                      }]
                  }
 options1 ={
      xAxis: {
      type: 'category'
      },
       yAxis: {
          type: 'value'
        },
                      series: [{
                          smooth: true,
                          data: [],
                          type: 'bar'
                      }]
                  }
  constructor(
    socketService : SocketService
  ){
    socketService.listen('line').subscribe((res: any) => {
      console.log('responseeeeeeeeeee m l trigger', res);
      this.options.series[0].data=res.data;
      this.options = this.deepCopyFunction(this.options);
    });
    socketService.listen('bar').subscribe((res: any) => {
      console.log('responseeeeeeeeeee m l trigger', res);
      this.options1.series[0].data=res.data;
      this.options1 = this.deepCopyFunction(this.options1);
    });

  }



}
