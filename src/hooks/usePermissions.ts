import { useEffect, useState } from 'react';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  openPhotoPicker,
  Permission,
} from 'react-native-permissions';


interface PermissionResponse {
  camera: PermissionStatus | null;
  addLibrary: PermissionStatus | null;
  requestCameraPermission: () => Promise<void>;
  requestAddLibraryPermission: () => Promise<void>;
  ready: boolean;
  openPhotoPickerScreen: () => Promise<void>;
}

const usePermissions = (): PermissionResponse => {
  const [ready, setReady] = useState(false);
  const [cameraPermission, setCameraPermission] =
    useState<PermissionStatus | null>(null);

  const [addLibraryPermission, setAddLibraryPermission] =
    useState<PermissionStatus | null>(null);

  useEffect(() => {
    const checkPermission = async (
      permission: Permission,
      setPermission: (state: PermissionStatus | null) => void,
    ) => {
      try {
        const status = await check(permission);
        setPermission(status);
      } catch (err: unknown) {
        console.log(err);
        setPermission(null);
      }
    };

    checkPermission(PERMISSIONS.IOS.CAMERA, setCameraPermission)
      .then(() =>
        checkPermission(
          PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          setAddLibraryPermission,
        ),
      )
      .then(() => setReady(true));
  }, []);

  const requestPermission = async (
    permission: Permission,
    setPermission: (state: PermissionStatus | null) => void,
  ) => {
    try {
      setReady(false);
      const status = await request(permission);
      setPermission(status);
    } catch (err: unknown) {
      console.log(err);
      setPermission(null);
    } finally {
      setReady(true);
    }
  };

  const openPhotoPickerScreen = async () => {
    await openPhotoPicker();
  };

  const requestCameraPermission = async () => {
    await requestPermission(PERMISSIONS.IOS.CAMERA, setCameraPermission);
  };

  const requestAddLibraryPermission = async () => {
    await requestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY, setAddLibraryPermission);
  };
  return {
    camera: cameraPermission,
    addLibrary: addLibraryPermission,
    ready: ready,
    openPhotoPickerScreen: openPhotoPickerScreen,
    requestCameraPermission: requestCameraPermission,
    requestAddLibraryPermission: requestAddLibraryPermission,
  };
};

export default usePermissions;
