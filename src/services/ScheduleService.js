import moment from 'moment';
import { APIService } from "./APIService";
import C from "../constants/Constants";

export class ScheduleService {
    /**
     * Returns either a string (classID), or a number below 0 (off-class)
     * @param schedule 
     * @param scheduleUpdate 
     */
    static getCurrentPeriod(schedule, scheduleUpdate) {
        // return C.OUT_OF_SCHOOL;

        let startTime = moment(C.SCHOOL_START_TIME, C.TIME_FORMAT);
        let endTime = moment(C.SCHOOL_END_TIME, C.TIME_FORMAT);

        let day = moment().day();

        // if now is out of school hours, or if it's Sunday or Saturday
        if(!moment().isBetween(startTime, endTime) || day === C.SUNDAY || day === C.SATURDAY) {
            return [C.OUT_OF_SCHOOL];
        }

        let classes = schedule[day]; // format of [id1, id2, id3, id4]

        if(day === C.WEDNESDAY) {
            let specialDay = 0;

            // Special case: check for update, if not, follow extended advisory
            if (Object.keys(scheduleUpdate).length > 0) {
                // has updated days; check if today is one of them
                for (let [date, day] of Object.entries(scheduleUpdate)) {
                    var dateMoment = moment(date, C.DATE_FORMAT);
                    var nowMoment = moment().format(C.DATE_FORMAT);
                    if(dateMoment.isSame(nowMoment)) {
                        specialDay = day;
                        break;
                    }
                }
                
                if(specialDay > 0) classes = schedule[day];
            } 

            // check if advisory time
            let extAdvStart = moment(C.ADVISORY_WED_START, C.TIME_FORMAT);
            let extAdvEnd = moment(C.ADVISORY_WED_END, C.TIME_FORMAT);
            if(moment().isBetween(extAdvStart, extAdvEnd)) {
                return [C.PERIOD_EXTADVISORY, extAdvStart, extAdvEnd];
            }
        }

        // if it's not a special day, and if it's not advisory, then it's out of school
        if (classes === null) return [C.OUT_OF_SCHOOL];

        // if we're here, then it's either a normal day or a modified Wednesday following a normal day
        for (let [timerange, value] of Object.entries(C.SCHEDULE_NORMAL)) {
            let periodStart = moment(timerange.split("-")[0], C.TIME_FORMAT);
            let periodEnd = moment(timerange.split("-")[1], C.TIME_FORMAT);
            if(moment().isBetween(periodStart, periodEnd)) {
                if(value >= 0) {
                    // real class, return classId
                    return [classes[value], periodStart, periodEnd];
                } else {
                    // off-class, return the number representation of the class
                    return [value, periodStart, periodEnd];
                }
            }
        }

        return [C.OUT_OF_SCHOOL];


        // //
        
        // // if(day === C.MONDAY || day === C.THURSDAY) schedule = C.SCHEDULE_MON_THURS;
        // // if(day === C.TUESDAY || day === C.FRIDAY) schedule = C.SCHEDULE_TUES_FRI;
        // // if(day === C.WEDNESDAY) schedule = C.SCHEDULE_WED;

        // APIService.getScheduleUpdate(token, (newSchedule) => {
        //     // if update, then replace; otherwise, keep
        //     if (newSchedule.length > 0) schedule = newSchedule[0];

        //     let currentPeriod = C.OUT_OF_SCHOOL;
        //     for (let [timerange, period] of Object.entries(schedule)) {
        //         let periodStart = moment(timerange.split("-")[0], C.TIME_FORMAT);
        //         let periodEnd = moment(timerange.split("-")[1], C.TIME_FORMAT);
        //         if(moment().isBetween(periodStart, periodEnd)) {
        //             currentPeriod = period;
        //             break;
        //         }
        //     }

        //     console.log("CURRENT PERIOD: " + currentPeriod);
        //     callback(currentPeriod);
        // }); 

    }


}