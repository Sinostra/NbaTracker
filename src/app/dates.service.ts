import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  public getDatesBetween(startDate: Date, endDate: Date): string {
    let dateString: string = ""
    let currentDate = startDate
    while(currentDate > endDate) {
      currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1))
      dateString += `dates[]=${currentDate.toISOString().split("T")[0]}&`
    }
    return dateString
  }

  public getEndDate(startDate: Date, daysAmount: number): Date {
    return new Date(startDate.setDate(startDate.getDate() - daysAmount))
  }
}