import DropDownHolder from "../DropDownHolder";

describe("Services/DropDownHolder", () => {
    it("getDropDown", () => {
        const ref = {
            alertWithType: (type, title, message) => null,
        };
        DropDownHolder.setDropDown(ref);
        expect(DropDownHolder.getDropDown()).toEqual(ref);
    });
    it("success", () => {
        const refSuccess = {
            alertWithType: (type, title, message) => {
                expect({ type, title, message }).toEqual({ type:"success", title:"title", message:"message" });
            },
        };
        DropDownHolder.setDropDown(refSuccess);
        DropDownHolder.success("title", "message");
    });
    it("success nomessage", () => {
        const refSuccess = {
            alertWithType: (type, title, message) => {
                expect({ type, title, message }).toEqual({ type:"success", title:"title", message:"" });
            },
        };
        DropDownHolder.setDropDown(refSuccess);
        DropDownHolder.success("title");
    });
    it("info", () => {
        const refInfo = {
            alertWithType: (type, title, message) => {
                expect({ type, title, message }).toEqual({ type:"info", title:"title", message:"message" });
            },
        };
        DropDownHolder.setDropDown(refInfo);
        DropDownHolder.info("title", "message");
    });
    it("info nomessage", () => {
        const refInfo = {
            alertWithType: (type, title, message) => {
                expect({ type, title, message }).toEqual({ type:"info", title:"title", message:"" });
            },
        };
        DropDownHolder.setDropDown(refInfo);
        DropDownHolder.info("title");
    });
    it("error", () => {
        const refError = {
            alertWithType: (type, title, message) => {
                expect({ type, title, message }).toEqual({ type:"error", title:"title", message:"message" });
            },
        };
        DropDownHolder.setDropDown(refError);
        DropDownHolder.error("title", "message");
    });
    it("error nomessage", () => {
        const refError = {
            alertWithType: (type, title, message) => {
                expect({ type, title, message }).toEqual({ type:"error", title:"title", message:"" });
            },
        };
        DropDownHolder.setDropDown(refError);
        DropDownHolder.error("title");
    });
});