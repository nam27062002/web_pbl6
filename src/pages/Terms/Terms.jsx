import React, { useState, useEffect, useRef } from 'react';
import style from './Terms.module.css';
import './Terms.css';
const Terms = () => {
    return(
                <div className={`term-wrapper container py-5 `}>
                    <div className = {`terms bg-white rounded p-4 pt-5 px-5 `}>
                    <h1 align="center">Ridewizard's Working Rules: Online Ride Booking Service</h1>
                        <hr/>
                        <div>
                            
                            <p align="center"><b>PART 1. GENERAL PROVISIONS</b>&nbsp;</p>

                            <p>1.1. This document is sent to all individuals (hereinafter referred to as "Customers") as an official proposal from "Ridewizard: Ride and Delivery Service" (hereinafter referred to as "Service") and contains all the essential terms and conditions of the services provided by the Service, aiming to register Customers' orders in the Service's software and hardware system and provide information on the status of order tracking for Customers.</p>
                            <p></p>

                            <p>1.2. According to the current laws of the Socialist Republic of Vietnam, this document is a public offer hereinafter referred to as the "Code of Conduct." Ordering through the Service by any means specified in these Rules of Conduct shall be considered acceptance and equivalent to signing a contract under the terms set out therein. These Rules of Conduct are posted on the official website of the Service at https://www.ridewizard.pro.</p>
                            <p></p>

                            <p>1.3. By accepting the terms of this Code of Conduct, Customers also agree to the Service's Privacy Policy related to the processing of personal data posted at <a href="https://ridewizard.pro/term/policy-client/">https://ridewizard.pro/term/policy-client/</a>.</p>
                            <p></p>

                            <p>1.4. Customers must carefully read the text of these Rules of Conduct. If Customers do not agree with any terms, they may kindly refrain from using the service.</p>
                            <p></p>

                            <p>1.5. The terms and definitions used to meet the conditions of these Rules of Conduct are as follows:</p>
                            <p></p>

                            <p>1.5.1. "Service" means information services focused on receiving, processing, and transmitting Customer orders to Partners and notifying the status of order tracking to Customers. Customers can order services including, but not limited to: passenger and cargo transportation, delivery, and transportation of goods. The Service does not provide Customers with passenger and cargo transportation services as well as any other services, including the delivery and transportation of goods. Payments from the Customer's personal account are deducted on behalf of the Partner in the form of fees for the services provided by the Partner to the Customer;</p>
                            <p></p>

                            <p>1.5.2. "Order" means an order processed by the system for the services provided by Partners;</p>
                            <p></p>

                            <p>1.5.3. "Partner" means a business, an entity, or an individual who independently provides passenger and cargo transportation services and/or any other services, including the delivery and transportation of goods to Customers;</p>
                            <p></p>

                            <p>1.5.4. "Profile" means a page on the official website of the Service containing statistical data about the scope of services provided by the Partner and the current status of the Customer's personal account;</p>
                            <p></p>

                            <p>1.5.5. "Customer" means a person who orders passenger and cargo transportation services and/or any other services, including the delivery and transportation of goods through the Service;</p>
                            <p></p>

                            <p>1.5.6. "Route" means the route of the vehicle between the starting point and the destination;</p>
                            <p></p>

                            <p>1.5.7. "Pre-order" means an order for passenger and cargo transportation services and any other services, including the delivery and transportation of goods, accepted at least sixty (60) minutes in advance and assumed to be available at the time specified by the Customer;</p>
                            <p></p>

                            <p>1.5.8. "Current Order" means an order assumed to arrive "as soon as possible";</p>
                            <p></p>

                            <p>1.5.9. "Mobile Application" means a computer program installed on the Customer's mobile device and integrated into the software and hardware system, allowing for the automation of the online ordering process.</p>
                            <p></p>

                            <p></p>
                            <p>&nbsp;</p>

                            <p align="center"><b>PART 2. SUBJECT OF THE CODE OF CONDUCT</b></p>
                            <p><b></b></p><b></b>

                            <p align="center"></p>
                            <p>&nbsp;</p>

                            <p>2.1. The Service will provide Customers with free services for the purpose of entering orders into the software and hardware system and notifying Customers of order execution. The Service is not a transport or courier company, and it will not provide Customers with passenger and cargo transportation services or any other services, including the delivery and transportation of goods, acting as an order dispatcher for Partners.</p>
                            <p></p>

                            <p></p>
                            <p>&nbsp;</p>

                            <p align="center"><b>PART 3. PROCEDURE OF SERVICE PROVISION</b></p>
                            <p><b></b></p><b></b>

                            <p align="center"></p>
                            <p>&nbsp;</p>

                            <p>3.1. Customers will accept the terms of this Code of Conduct by contacting the Service to order a vehicle using any available means.</p>
                            <p></p>

                            <p>3.2. Customers are responsible for the content and reliability of the information provided when ordering.</p>
                            <p></p>

                            <p>3.3. After ordering, Customer data is registered in the Service's database. Customer data will not be changed or modified without their consent.</p>
                            <p></p>

                            <p>3.4. The Service will enter orders into the software and hardware system free of charge and grant access to the software and hardware system for the Partner to select orders and notify the Service of their choice, specifying the arrival time for the selected orders. Therefore, the Service will only ensure the entry of orders into the software and hardware system. The Partner will be responsible for the transportation of passengers and cargo, as well as any other services, including the delivery and transportation of goods.</p>
                            <p></p>

                            <p>3.5. The Service will inform Customers about the arrival of the vehicle, specifying mandatory details of the Partner and their vehicle, as required by relevant rules and regulations.</p>
                            <p></p>

                            <p>3.6. The Service may accept pre-orders for vehicle provision. The timeliness of vehicle arrival is the responsibility of the Partner, which the Service will notify in advance regarding pre-ordered service. However, the arrival of the vehicle is not guaranteed.</p>
                            <p></p>

                            <p>3.7. The Service has the right to refuse service to Customers who do not agree to the terms of this Code of Conduct without explaining the reason for the refusal.</p>
                            <p></p>

                            <p>3.8. Telephone calls between Customers and the Service will be recorded for internal control of Service activities and quality control of order execution.</p>
                            <p></p>

                            <p>3.9. To improve the quality of services provided and ensure real-time interaction between Customers and Partners, Customers may notify the Service of cases where the Partner violates their rights using an electronic feedback form or in writing at the Service's location. In this case, the Service will notify the Partner of the complaint received from the Customer, share the Customer's phone number with the Partner, and provide the content of the Customer's complaint. Subsequent conflict resolution will be carried out between the Customer and the Partner without the Service's involvement. The contents of this provision shall not be considered as the Service's acceptance of any obligation to compensate for material or monetary damage or any other obligations not stipulated in these Rules of Conduct.</p>
                            <p></p>

                            <p>3.10. When collecting and processing Customer data, the Service will be guided by the laws of the Socialist Republic of Vietnam and the Service's Privacy Policy regarding the processing of personal data.</p>
                            <p></p>

                            <p>3.11. If Customers have any questions regarding the features of the service, Customers should seek advice from the Service's experts before ordering.</p>
                            <p></p>

                            <p><b></b></p>
                            <p><b>&nbsp;</b></p><b></b>

                            <p align="center"><b>PART 4. SERVICE RESPONSIBILITY</b></p>
                            <p><b></b></p><b></b>

                            <p align="center"></p>
                            <p>&nbsp;</p>

                            <p>4.1. The Service will create Customer orders in the software and hardware system for free and notify Customers of order execution.</p>
                            <p></p>

                            <p>4.2. The Service will inform Customers in cases where orders have to be postponed.</p>
                            <p></p>

                            <p>4.3. The Service will inform Customers in cases where orders cannot be provided.</p>
                            <p></p>

                            <p>4.4. The Service will promptly detect and prevent unauthorized access to information provided by Customers and/or the transfer of that information to unrelated individuals directly involved in order execution.</p>
                            <p></p>

                            <p><b></b></p>
                            <p><b>&nbsp;</b></p><b></b>

                            <p align="center"><b>SECTION 5. CUSTOMER RESPONSIBILITIES</b></p>
                            <p><b></b></p><b></b>
                            <p align="center"></p>
                            <p>&nbsp;</p>
                            <p>5.1. The customer shall book services with an estimated time required to complete the order.</p>
                            <p></p>
                            <p>5.2. The customer must provide their phone number, time, and address for order execution, the type of vehicle, travel route, necessary transportation conditions.</p>
                            <p></p>
                            <p>5.3. The customer shall use the provided vehicle for its intended purpose.</p>
                            <p></p>
                            <p>5.4. The customer must keep the vehicle clean and tidy throughout the journey.</p>
                            <p></p>
                            <p></p>
                            <p>&nbsp;</p>
                            <p align="center"><b>SECTION 6. AGREEMENT ON PAYMENT BETWEEN CUSTOMER AND PARTNER</b></p>
                            <p><b></b></p><b></b>
                            <p align="center"></p>
                            <p>&nbsp;</p>
                            <p>6.1. The service will provide services free of charge to the customer, the service's target for these rules of work will determine.</p>
                            <p></p>
                            <p>6.2. Payment for the provision of passenger and luggage transportation services, as well as any other services, including delivery and transportation of goods, will be made directly between the customer and the partner. The service will inform the customer of the cost of the provided services. The specific cost will be calculated based on the partner's accepted order. Informing the customer about the final cost of passenger and luggage transportation services, as well as any other services, including delivery and transportation of goods, provided by the service, will not imply and may not be considered a fact that the services will be free of charge.</p>
                            <p></p>
                            <p>6.3. The form of payment for the provision of passenger and luggage transportation services and any other services, including delivery and transportation of goods, will be agreed directly between the customer and the partner without the service's involvement.</p>
                            <p></p>
                            <p>6.4. The service will not provide the customer and the partner with any instructions on the form and procedure of payment for the provided passenger and luggage transportation services, as well as any other services, including delivery and transportation of goods.</p>
                            <p></p>
                            <p>6.5. The service will provide technical capability for the customer to pay for passenger and luggage transportation services and any other services, including the delivery and transportation of goods by the following methods:</p>
                            <p></p>
                            <p>6.5.1. Cash payment.</p>
                            <p></p>
                            <p>6.6. If the customer changes the scope of services required for passenger and luggage transportation and any other services, including the delivery and transportation of goods (changing the route, providing the customer with additional partner-paid services, etc.), the cost will be recalculated. The customer will pay for the order in accordance with the scope of services actually provided.</p>
                            <p></p>
                            <p>6.7. The partner will have the right to set the cost for providing additional services to the customer, including:</p>
                            <p></p>
                            <p>6.7.1. Waiting longer than the specified time from the moment the customer is notified that the vehicle has arrived;</p>
                            <p></p>
                            <p>6.7.2. Transportation of excess baggage.</p>
                            <p></p>
                            <p>6.8. The partner will have the right to impose a penalty on the customer for refusing the trip after the vehicle has arrived at the customer's designated location. The penalty amount will be determined by the partner.</p>
                            <p></p>
                            <p>6.9. The service will inform the customer of the prices set by the partner for providing additional services and penalties. At the same time, payment for providing additional services, payment of fines will be made directly to the partner in the manner agreed upon by the customer and the partner.</p>
                            <p></p>
                            <p>6.10. The service is not a beneficiary and will not receive any profit from the customer's payments.</p>
                            <p></p>
                            <p>6.11. The service will be the customer of its product promotion services ("Ridewizard: Ride Booking, Delivery") and the partner will be the signatory for the promotion of the customer's product. In this relationship, the partner will transport for free or at a reduced cost compared to the service's cost. The amount for the trip will be deducted from the partner's personal account opened in the service.</p>
                            <p></p>
                            <p>6.12. The service will be the provider of a licensed access to the database (on a non-exclusive license basis) for the partner. The license fee will be deducted from the partner's personal account opened in the service.</p>
                            <p></p>
                            <p>6.13. A positive balance in the partner's personal account will be considered a debt owed to the partner by the service.</p>
                            <p></p>
                            <p>6.14. A negative balance in the partner's personal account will be considered a debt owed by the partner to the service for the services provided by the partner.</p>
                            <p></p>
                            <p>6.15. The partner will be an independent economic entity, and they will be solely and fully responsible for tax and insurance matters.</p>
                            <p></p>
                            <p><b></b></p>
                            <p><b>&nbsp;</b></p><b></b>

                            <p align="center"><b>SECTION 7. LEGAL RESPONSIBILITIES OF THE PARTIES</b></p>
                            <p><b></b></p><b></b>

                            <p align="center"></p>
                            <p>&nbsp;</p>

                            <p>7.1. The parties shall be responsible for not fulfilling their obligations as stipulated by the laws of the Socialist Republic of Vietnam.</p>
                            <p></p>

                            <p>7.2. The Service shall not be responsible for any interruptions in providing the Service in the case of software or hardware failures that are not within the Service's control.</p>
                            <p></p>

                            <p>7.3. The Service shall not be responsible for complete or partial interruptions in the provision of the Service related to the replacement of hardware, software, or other necessary tasks to maintain the operation and development of the Service's technical means.</p>
                            <p></p>

                            <p>7.4. The Service shall not be responsible for direct damages, lost profits that the Customer may incur due to the use of the Service.</p>
                            <p></p>

                            <p>7.5. The Service shall not be responsible for the failure of the Partner to fulfill its obligations.</p>
                            <p></p>

                            <p><b></b></p>
                            <p><b>&nbsp;</b></p><b></b>

                            <p align="center"><b>SECTION 8. DISPUTE RESOLUTION</b></p>
                            <p><b></b></p><b></b>

                            <p align="center"></p>
                            <p>&nbsp;</p>

                            <p>8.1. The parties shall resolve disputes and disagreements related to these Rules through negotiation.</p>
                            <p></p>

                            <p>8.2. In cases where disputes cannot be resolved through negotiation, the dispute shall be resolved in the competent court according to the current laws of the Socialist Republic of Vietnam.</p>
                            <p></p>

                            <p><b></b></p>
                            <p><b>&nbsp;</b></p><b></b>

                            <p align="center"><b>SECTION 9. SPECIAL PROVISIONS</b></p>
                            <p><b></b></p><b></b>

                            <p align="center"></p>
                            <p>&nbsp;</p>

                            <p>9.1. By agreeing to the terms of these Rules, the Customer expresses their consent to receive information as well as advertising information (including social media messaging applications) distributed via mobile networks for the purpose, and in cases required, this consent is governed by current advertising laws in Vietnam.</p>
                            <p></p>

                            <p>9.2. By agreeing to the terms of these Rules, the Customer also expresses their consent to the following terms and special conditions related to the delivery and transportation of goods:</p>
                            <p></p>

                            <p>9.2.1. The following items are prohibited for delivery: fragile items (including flowers, cakes) requiring special handling; perishable items; dangerous, explosive, flammable, and unsafe items (including power banks); items of value; credit cards or debit cards; illegal substances; live animals and plants; any unpacked/unenclosed items that can be easily damaged during transportation; counterfeit or imitation goods; live or otherwise; gold bars, currency of any denomination, tax stamps/labels, transfer instruments, precious metals/stones; real or fake weapons including handguns or parts thereof, explosives, or ammunition; human remains or body parts; adult material.</p>
                            <p></p>

                            <p>9.2.2. The Partner will cooperate in any criminal investigation requested and to assist the Service in compliance with any internal investigations, guidance from competent authorities, or legal or regulatory requirements at the place. The Partner has the right to refuse delivery if the delivered items fall under the categories listed in section 9.2.1 above. The Partner will also be fully responsible and legally responsible for all losses or damages caused by their actions, whether directly or indirectly, by themselves, any Customer, the Service, or any third party due to any violation of these Rules.</p>
                            <p></p>

                            <p>9.3. The Customer declares and warrants that:</p>
                            <p></p>

                            <p>9.3.1. They are the owner or authorized representative of the delivered items and are authorized to accept and accept these Rules for themselves or on behalf of the owner of the delivered items;</p>
                            <p></p>

                            <p>9.3.2. They are responsible for ensuring that the delivery details (e.g., recipient's name, contact details, and delivery address) they enter are accurate and complete. The Service shall not be responsible for late deliveries or non-delivery of items due to incorrect delivery details entered by the Customer;</p>
                            <p></p>

                            <p>9.3.3. They are duly authorized by the recipient to provide the recipient's details (e.g., name, contact details, and delivery address) to the Service and the Partner;</p>
                            <p></p>

                            <p>9.3.4. The description and specific details of the delivered items they provide are accurate and complete. Before commencing delivery, they must inform the Partner of any specific preventive measures that need to be applied to handle the delivered items in their true nature;</p>
                            <p></p>

                            <p>9.3.5. The delivered items comply with all current laws and regulations related to the nature, condition, packaging, handling, storage, and transportation of the delivered items and the delivered items do not or do not have the nature, in any way or under any conditions: (a) do not comply with or are prohibited by any current law or regulation; (b) are dangerous; (c) easily deteriorate in quality; (d) are flammable; (e) contain explosives; (f) are corrosive; (g) contain radioactive materials; (h) are prohibited based on the terms stipulated in the ASEAN Framework Agreement on Facilitating Goods in Transit (including Annex 9); and/or (i) are regulated by other relevant agencies;</p>
                            <p></p>

                            <p>9.4. The Service and/or Partner have the right to inspect the delivered items without prior notice to the Customer based on any reasonable suspicion that the delivered items may contain or constitute items that do not comply with or are prohibited as mentioned in the terms above and here. The Service and/or Partner have the right to refuse to receive and deliver the delivered items;</p>
                            <p></p>

                            <p>9.5. The delivered items are packed, prepared properly and sufficiently by the Customer themselves, appropriately packaged, neatly stacked, labeled, and marked in a manner appropriate for any activities or transactions affecting the delivered items and the characteristics of the delivered items;</p>
                            <p></p>

                            <p>9.6. After the delivery items have been handed over, they are fully responsible for late delivery, loss, damage, contamination, dirt, or detention related to the delivered items, whether directly or indirectly caused by themselves or any recipient (or anyone acting as a server, representative, or independent contracting party or on behalf of themselves or the recipient);</p>
                            <p></p>

                            <p>9.7. As a general principle, they do not have the right to cancel their order after receiving similar confirmation. If they cancel their order after confirmation, they are still responsible for paying the full delivery fee. They are also responsible for paying the full delivery fee in cases where the recipient they designated cannot be contacted or cannot be contacted within five (5) minutes from the time the Partner arrives at the designated delivery location. The Service and the Partner have the right not to proceed with their order in the following cases: (a) when the delivery location requested is outside the provided delivery area; (b) if they cannot be reached by phone or other means at the time of order confirmation; (c) they cannot complete their order due to a lack of information, instructions, or authorization at the time of delivery; or (d) the recipient they designated cannot be contacted or cannot be contacted within five (5) minutes from the time the Partner arrives at the designated delivery location;</p>
                            <p></p>

                            <p>9.8. The Customer agrees to be fully responsible and legally responsible for all losses or damages incurred by themselves, the Partner, the Service, or any third party due to any violation of these Rules.</p>
                            <p></p>

                            <p>9.9. The Service may amend these Rules at any time. Such amendments will take effect after being posted on the official website of the Service at <a href="https://www.ridewizard.pro/">https://www.ridewizard.pro</a>. The Customer is responsible for reviewing these Rules regularly. The Customer's continued use of the Service after any such amendments, whether reviewed by the Customer or not, will constitute the Customer's agreement to be bound by those amendments.</p>
                            <p></p>
                        </div>
                    </div>
                </div>
    )
}

export default Terms;