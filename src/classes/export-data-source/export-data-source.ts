
import { Observable } from 'rxjs/Observable';

export class ExportDataSource {
    constructor(private data: any[]) {
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
        return Observable.of(this.data);
    }

    disconnect() {}
}