import moment from "moment-timezone";
import "moment/locale/fr";

moment.locale("fr");

export const getMoment = (momentObj) => moment.utc(momentObj).utcOffset(-5);
export const getMomentForDisplay = (momentObj) => moment(momentObj);
