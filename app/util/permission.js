import { Permissions } from "expo";

export const CAMERA = Permissions.CAMERA;
export const CAMERA_ROLL = Permissions.CAMERA_ROLL;

export async function getBeforeAsk(usePermission) {
    const { getStatus } = await Permissions.getAsync(usePermission);
    if (getStatus !== "granted") {
        const { askStatus } = await Permissions.askAsync(usePermission);
        if (askStatus !== "granted") {
            return false;
        }
    }
    return true;
}
