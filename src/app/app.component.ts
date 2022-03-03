/*
https://www.eduforbetterment.com/
*/
import { Component, VERSION, ViewChild } from '@angular/core';

export class CsvData {
  public id: any;
  public min: any;
  public max: any;
  public score: any;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay: any;

  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headersRow.length
        );
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    const map = {};
    const def = [
      'salto.enabled',
      'salto_svn.enabled',
      'open_path.enabled',
      'dsx.enabled',
      's2.enabled',
      'amag.enabled',
      'ccure.enabled',
      'kastle.enabled',
      'genetec.enabled',
      'hid_subscription.enabled',
      'is_vingcard_property',
      'genea.enabled',
      'is_genea_enabled',
      'braxos.enabled',
      'is_luxer_property',
      'is_parcel_pending_property',
      'entrata.enabled',
      'yardi.enabled',
      'yardi.enable_wo_sync',
      'yardi.payment.enabled',
      'amsi.enabled',
      'is_realpage_property',
      'is_resman_property',
      'is_lifestart_integration',
      'cvps.enabled',
      'enable_assignment_valet_association',
      'maxxess.enabled',
      'is_mri_enabled',
      'schindler.enabled',
      'google_auth',
      'salesforce.enabled',
      'building_engines.enabled',
      'schlage.enabled',
      'iotas.enabled',
      'blubox.enabled',
      'sv3.enabled',
    ];
    for (let i = 3; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      // console.log(csvRecordsArray.length);
      // console.log(def.length);
      // if (curruntRecord.length == headerLength) {
      //   let csvRecord: CsvData = new CsvData();
      //   csvRecord.id = curruntRecord[0].trim();
      //   csvRecord.min = curruntRecord[1].trim();
      //   csvRecord.max = curruntRecord[2].trim();
      //   csvRecord.score = curruntRecord[3].trim();
      //   csvArr.push(csvRecord);
      // }
      console.log(def[i - 3] + '----------------------------------');
      for (let j = 1; j < curruntRecord.length; j++) {
        map[def[i - 3]] = {};
        if (curruntRecord[j] == 'N') {
          console.log(def[j - 1] + '+');
          map[def[i - 3]] = {
            ...map[def[i - 3]],
            [def[j - 1]]: { disabled: true },
          };
          // console.log(map);
        }
      }
      console.log('\n');
    }
    // console.log(map);
    return csvArr;
  }

  //check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
    this.jsondatadisplay = '';
  }

  getJsonData() {
    this.jsondatadisplay = JSON.stringify(this.records);
  }
}
