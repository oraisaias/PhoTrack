import { useEffect, useState } from "react";
import { check, PERMISSIONS, PermissionStatus, request, RESULTS ,openPhotoPicker} from 'react-native-permissions';

interface PermissionState {
  hasPermission: boolean;
  status: PermissionStatus | null;
  error: string | null;
}
interface PermissionResponse {
  hasPermission: boolean;
  permissionStatus: PermissionStatus | null;
  error: string | null;
  hasPermissionLibrary: boolean;
  permissionStatusLibrary: PermissionStatus | null;
  errorLibrary: string | null;
  hasPermissionLibraryAddOnly: boolean;
  permissionStatusLibraryAddOnly: PermissionStatus | null;
  errorLibraryAddOnly: string | null;
  request: () => Promise<void>;
  requestCameraPermission: () => Promise<void>;
  requestPhotoLibraryPermission: () => Promise<void>;
  requestPhotoLibraryAddOnlyPermission: () => Promise<void>;
  ready: boolean;
  openPhotoPickerScreen: () => Promise<void>;
}

const usePermissions = (): PermissionResponse => {
  const [ready, setReady] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<PermissionState>({
    hasPermission: false,
    status: null,
    error: null
  });
  
  const [photoLibraryPermission, setPhotoLibraryPermission] = useState<PermissionState>({
    hasPermission: false,
    status: null,
    error: null
  });
  
  const [photoLibraryAddOnlyPermission, setPhotoLibraryAddOnlyPermission] = useState<PermissionState>({
    hasPermission: false,
    status: null,
    error: null
  });

  const handlePermissionStatus = (status: PermissionStatus, setPermission: (state: PermissionState) => void) => {
    let hasPermission = false;
    let error: string | null = null;

    switch (status) {
      case RESULTS.UNAVAILABLE:
        error = 'This feature is not available (on this device / in this context)';
        break;
      case RESULTS.DENIED:
        error = 'The permission has not been requested / is denied but requestable';
        break;
      case RESULTS.BLOCKED:
        error = 'The permission is denied and not requestable';
        break;
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        hasPermission = true;
        break;
    }

    setPermission({ hasPermission, status, error });
  };

  useEffect(() => {
    const checkPermission = async (permission: any, setPermission: (state: PermissionState) => void) => {
      try {
        const status = await check(permission);
        handlePermissionStatus(status, setPermission);
      } catch (err) {
        setPermission({ hasPermission: false, status: null, error: 'Failed to check permission' });
      }
    };

    checkPermission(PERMISSIONS.IOS.CAMERA, setCameraPermission)
    .then(() => checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY, setPhotoLibraryPermission))
    .then(() => checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY, setPhotoLibraryAddOnlyPermission))
    .then(() => setReady(true));
  }, []);

  const requestPermission = async (permission: any, setPermission: (state: PermissionState) => void) => {
    try {
      const status = await request(permission);
      handlePermissionStatus(status, setPermission);
    } catch (err) {
      setPermission({ hasPermission: false, status: null, error: 'Failed to request permission' });
    }
  };

  const requestAllPermissions = async () => {
    await Promise.all([
      requestPermission(PERMISSIONS.IOS.CAMERA, setCameraPermission),
      requestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY, setPhotoLibraryPermission),
      requestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY, setPhotoLibraryAddOnlyPermission)
    ]);
    setReady(true);
  };

  const openPhotoPickerScreen = async () => {
    await openPhotoPicker()
  }
  
  return {
    // Camera permissions
    hasPermission: cameraPermission.hasPermission,
    permissionStatus: cameraPermission.status,
    error: cameraPermission.error,
    
    // Photo library permissions
    hasPermissionLibrary: photoLibraryPermission.hasPermission,
    permissionStatusLibrary: photoLibraryPermission.status,
    errorLibrary: photoLibraryPermission.error,
    
    // Photo library add only permissions
    hasPermissionLibraryAddOnly: photoLibraryAddOnlyPermission.hasPermission,
    permissionStatusLibraryAddOnly: photoLibraryAddOnlyPermission.status,
    errorLibraryAddOnly: photoLibraryAddOnlyPermission.error,
    
    // Request functions
    request: requestAllPermissions,
    
    // Individual request functions
    requestCameraPermission: () => requestPermission(PERMISSIONS.IOS.CAMERA, setCameraPermission),
    requestPhotoLibraryPermission: () => requestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY, setPhotoLibraryPermission),
    requestPhotoLibraryAddOnlyPermission: () => requestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY, setPhotoLibraryAddOnlyPermission),
    ready:ready,
    openPhotoPickerScreen,
  };
};

export default usePermissions;