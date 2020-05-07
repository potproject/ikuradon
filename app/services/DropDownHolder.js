export default class DropDownHolder {
    static dropDownAlertRef;
    static setDropDown(dropDownAlertRef) {
        this.dropDownAlertRef = dropDownAlertRef;
    }
    static getDropDown() {
        return this.dropDownAlertRef;
    }

    static success(title, message = ""){
        this.dropDownAlertRef.alertWithType("success", title, message);
    }

    static error(title, message = ""){
        this.dropDownAlertRef.alertWithType("error", title, message);
    }
}