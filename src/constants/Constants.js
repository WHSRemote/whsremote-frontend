export default class Constants {
    /**
     * -1: Advisory
     * -2: Screen Break
     * -3: Lunch
     * -4: Extended Advisory (Wed Only)
     */
    
    static TIME_FORMAT = "HH:mm";
    static WEIRD_PERSON_TIME_FORMAT = "h:mm";
    static DATE_FORMAT = "MM-DD-YYYY";

    static SUNDAY = 0;
    static MONDAY = 1;
    static TUESDAY = 2;
    static WEDNESDAY = 3;
    static THURSDAY = 4;
    static FRIDAY = 5;
    static SATURDAY = 6;

    static SCHOOL_START_TIME = "08:35";
    static SCHOOL_END_TIME = "15:10";
     
    static PERIOD_ADVISORY = -1;
    static PERIOD_SCREENBREAK = -2;
    static PERIOD_LUNCH = -3;
    static PERIOD_EXTADVISORY = -4;
    static OUT_OF_SCHOOL = -100;

    static SCHEDULE_NORMAL = {
        "08:35-09:55": 0, // index of class in schedule array; first class
        "09:55-10:05": this.PERIOD_SCREENBREAK,
        "10:05-11:25": 1, // second class, etc
        "11:25-11:35": this.PERIOD_SCREENBREAK,
        "11:35-13:40": 2,
        "13:40-13:50": this.PERIOD_SCREENBREAK,
        "13:50-15:10": 3
    };

    static ADVISORY_WED_START = "10:00";
    static ADVISORY_WED_END = "10:25";
}