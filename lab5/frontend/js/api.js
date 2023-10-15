const BASE_URL = "http://localhost:5000"
const RESOURCE_URL = `${BASE_URL}/hotels/`

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    console.log({ urlPath, method, body })
    try {
        const reqParams = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body) {
            reqParams.body = JSON.stringify(body);
        }

        return await fetch(`${RESOURCE_URL}${urlPath}`, reqParams);
    } catch (error) {
        console.error("HTTP ERROR: ", error);
    }
};

export const getAllHotels = async () => {
    const rawResp = await baseRequest({ method: 'GET' });
    return await rawResp.json();
};

export const postHotel = (body) => baseRequest({ method: "POST", body });

export const delHotel = async (id) => {
    const rawResp = await baseRequest({ method: "DELETE", urlPath: `${id}/` });
    return await rawResp.json();
}

export const editHotel = async (id, body) => {
    await baseRequest({ method: "PUT", urlPath: `${id}/`, body })
    return getAllHotels()
}