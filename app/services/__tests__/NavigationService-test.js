import NavigationService from "../NavigationService";

jest.mock("@react-navigation/native", () => ({
    CommonActions: {
        goBack: jest.fn(),
        navigate: jest.fn(),
        reset: jest.fn(),
    },
}));

describe("Services/NavigationService", () => {
    it("NavigationService", () => {
        const ref = {
            dispatch: () => null
        };
        NavigationService.setTopLevelNavigator(ref);
        expect(NavigationService.getDispatch()).toEqual(ref.dispatch);
        NavigationService.back();
        NavigationService.navigate({ name: "Main", key: {}, params: {} });
        NavigationService.resetAndNavigate({ name: "Main" });
    });
});