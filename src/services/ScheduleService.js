import moment from 'moment';
import { APIService } from "./APIService";
import C from "../constants/Constants";

export class ScheduleService {
    static getCurrentPeriod(token, callback) {
        let startTime = moment(C.SCHOOL_START_TIME, C.TIME_FORMAT);
        let endTime = moment(C.SCHOOL_END_TIME, C.TIME_FORMAT);

        let day = moment().day();

        // if now is out of school hours, or if it's  Sunday  or Saturday
        if(!moment().isBetween(startTime, endTime) || day === C.SUNDAY || day === C.SATURDAY) {
            return C.OUT_OF_SCHOOL;
        } 

        let schedule = null;
        
        if(day === C.MONDAY || day === C.THURSDAY) schedule = C.SCHEDULE_MON_THURS;
        if(day === C.TUESDAY || day === C.FRIDAY) schedule = C.SCHEDULE_TUES_FRI;
        if(day === C.WEDNESDAY) schedule = C.SCHEDULE_WED;

        APIService.getScheduleUpdate(token, (newSchedule) => {
            // if update, then replace; otherwise, keep
            if (newSchedule.length > 0) schedule = newSchedule[0];

            let currentPeriod = C.OUT_OF_SCHOOL;
            for (let [timerange, period] of Object.entries(schedule)) {
                let periodStart = moment(timerange.split("-")[0], C.TIME_FORMAT);
                let periodEnd = moment(timerange.split("-")[1], C.TIME_FORMAT);
                if(moment().isBetween(periodStart, periodEnd)) {
                    currentPeriod = period;
                    break;
                }
            }

            console.log("CURRENT PERIOD: " + currentPeriod);
            callback(currentPeriod);
        }); 

    }


}