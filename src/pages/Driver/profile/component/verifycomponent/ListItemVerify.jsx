
import React, { useEffect, useState } from "react";
import axios from "axios";
import Verify from "./verify/Verify";


const ListItemVerify = () => {
    const [user, setUser] = useState(() => {
        const localData = JSON.parse(localStorage.getItem("user"));
        return localData || null;
      });
    const [listverify, setListVerify] = useState([])
    const [items, setItems] = useState([]);
    

    const verifyItem = (verify) => {
        const listItem = [
            {
                typeVerify: "ID Card verification",
                items: [
                    {
                        type: "ID Card (front)",
                        image: verify.type_1,
                        status: verify.type_1_status
                    },
                    {
                        type: "ID Card (back)",
                        image: verify.type_2,
                        status: verify.type_2_status
                    },
                ]
            },
            {
                typeVerify: "Driver Portrait verification",
                items: [
                    {
                        type: "Driver Portrait",
                        image: verify.type_3,
                        status: verify.type_3_status
                    },
                ]
            },
            {
                typeVerify: "Driver license verification",
                items: [
                    {
                        type: "Driver license (front)",
                        image: verify.type_4,
                        status: verify.type_4_status
                    },
                    {
                        type: "Driver license (back)",
                        image: verify.type_5,
                        status: verify.type_5_status
                    },
                ]
            },
            {
                typeVerify: "Criminal record certifycate verificarion",
                items: [
                    {
                        type: "Criminal record certifycate",
                        image: verify.type_6,
                        status: verify.type_6_status
                    },
                ]
            },
            {
                typeVerify: "Compulsory accident insurance verification",
                items: [
                    {
                        type: "Compulsory accident insurance (front)",
                        image: verify.type_7,
                        status: verify.type_7_status
                    },
                    {
                        type: "Compulsory accident insurance (back)",
                        image: verify.type_8,
                        status: verify.type_8_status
                    },
                ]
            },
            {
                typeVerify: "Medical health check verification",
                items: [
                    {
                        type: "Medical health check (page 1)",
                        image: verify.type_9,
                        status: verify.type_9_status
                    },
                    {
                        type: "Medical health check (page 2)",
                        image: verify.type_10,
                        status: verify.type_10_status
                    },
                    {
                        type: "Medical health check (page 3)",
                        image: verify.type_11,
                        status: verify.type_11_status
                    },
                    {
                        type: "Medical health check (page 4)",
                        image: verify.type_12,
                        status: verify.type_12_status
                    },
                ]
            },
            {
                typeVerify: "Vehicle certificate verification",
                items: [
                    {
                        type: "Vehicle certificate (front)",
                        image: verify.type_13,
                        status: verify.type_13_status
                    },
                    {
                        type: "Vehicle certificate (back)",
                        image: verify.type_14,
                        status: verify.type_14_status
                    },
                ]
            },
            {
                typeVerify: "Vehicle Image verification",
                items: [
                    {
                        type: "Vehicle Image (front)",
                        image: verify.type_15,
                        status: verify.type_15_status
                    },
                    {
                        type: "Vehicle Image (back)",
                        image: verify.type_16,
                        status: verify.type_16_status
                    },
                    {
                        type: "Vehicle Image (left)",
                        image: verify.type_17,
                        status: verify.type_17_status
                    },
                    {
                        type: "Vehicle Image (right)",
                        image: verify.type_18,
                        status: verify.type_18_status
                    },
                ]
            }
        ]
        setItems(listItem)
    }

    const initVerify = async () => {
        const res = await axios.get(`http://ridewizard.pro:9000/api/v1/drivers/identification/${user.user.id}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
        })
        setListVerify(res.data.data)
        verifyItem(res.data.data)
    }



    useEffect(() => {
        initVerify();
        console.log(items);
    },[])

    return (
        <>
            <div className="list-item-container w-100   py-2 px-2">
                {items.map((item) => (
                    <Verify
                        verify={item}
                    ></Verify>
                ))}
                
            </div>
        </>
    );
}


export default ListItemVerify