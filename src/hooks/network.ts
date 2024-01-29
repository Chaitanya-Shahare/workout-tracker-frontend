import { useCallback, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
// import { UserState } from "pages";
import * as Keychain from "react-native-keychain";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userState } from "../state";
// import { API_BASE_URL, environment } from "constant";

// import { loginState, WebTokenState } from "states";
// import { REACT_APP_API_HOST as API_HOST } from "envs";

interface IConfig {
  headers?: {
    Authorization?: string;
    "Content-Type"?: string;
  };
}

let accessToken = "";
// const API_HOST = API_BASE_URL[environment as keyof typeof API_BASE_URL];
// const API_HOST = API_BASE_URL.local;
const API_HOST = "http://localhost:5001";

export const useNetwork = () => {
  const loginUser = useRecoilValue(userState);
  const { token } = loginUser;
  // const webToken = useRecoilValue(WebTokenState);
  // const accessToken = webToken?.length > 0 ? webToken : token;
  if (token) {
    accessToken = token;
  }
  // const { logout } = useLogout();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const config: IConfig = useMemo(() => ({}), []);
  const postConfig: IConfig = useMemo(() => ({}), []);

  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  postConfig.headers = {
    "Content-Type": "application/json",
    ...(config.headers ?? {}),
  };

  const get = useCallback(
    async (url: string, configHeader?: any): Promise<any> => {
      setLoading(true);
      try {
        const response = await fetch(API_HOST + url, configHeader ?? config);
        const apiPayload = await response.json();
        if (apiPayload.message === "Unauthorized user.") {
          // logout();
        }

        setStatus(response?.ok);
        setIsLoaded(true);
        setData(apiPayload);
        return apiPayload;
      } catch (err: any) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  const post = useCallback(
    async (url: string, requestJSON: any) => {
      setLoading(true);
      try {
        const response = await fetch(API_HOST + url, {
          method: "POST",
          ...postConfig,
          body: JSON.stringify(requestJSON),
        });
        if (response.status === 500) {
          setError(response.type);
        }
        setStatus(response?.ok);
        const apiData = await response.json();
        if (url.includes("charts?businessId")) {
          setIsLoaded(true);
          setData(apiData);
          return apiData;
        }
        const apiResponse = apiData.data ?? apiData;
        setIsLoaded(true);
        setData(apiResponse);
        return apiResponse;
      } catch (err: any) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [postConfig, accessToken]
  );

  const formData = useCallback(async (url: string, requestJSON: any) => {
    setLoading(true);
    try {
      const response = await fetch(API_HOST + url, {
        // warning: POST is changed to PATCH
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: requestJSON,
      });
      const apiData = await response.json();
      setStatus(response?.ok);
      setIsLoaded(true);
      setData(apiData);
      setLoading(false);
      return apiData;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const put = useCallback(
    async (url: string, requestJSON?: any) => {
      try {
        const response = await fetch(API_HOST + url, {
          method: "PUT",
          ...postConfig,
          body: JSON.stringify(requestJSON),
        });
        setStatus(response?.ok);
        const apiData = await response.json();
        setStatus(response.status);
        setIsLoaded(true);
        setData(apiData.data);
        return apiData.data;
      } catch (err: any) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [postConfig, accessToken]
  );

  const remove = useCallback(
    async (url: string, requestJSON?: any) => {
      try {
        const response = await fetch(API_HOST + url, {
          method: "DELETE",
          ...postConfig,
          body: JSON.stringify(requestJSON),
        });
        setStatus(response?.ok);
        const apiData = await response.json();
        setStatus(response.status);
        setIsLoaded(true);
        setData(apiData.data);
        return apiData.data;
      } catch (err: any) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [postConfig, accessToken]
  );

  const patch = useCallback(
    async (url: string, requestJSON?: any) => {
      setLoading(true);
      try {
        const response = await fetch(API_HOST + url, {
          method: "PATCH",
          ...postConfig,
          body: JSON.stringify(requestJSON),
        });
        setStatus(response?.ok);
        const apiData = await response.json();
        setIsLoaded(true);
        const apiResponse = apiData.data ?? apiData;
        setData(apiResponse);
        return apiData.data;
      } catch (err: any) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [postConfig, accessToken]
  );

  return {
    get,
    post,
    formData,
    put,
    data,
    status,
    error,
    loading,
    setLoading,
    remove,
    patch,
    isLoaded,
    setIsLoaded,
  };
};
