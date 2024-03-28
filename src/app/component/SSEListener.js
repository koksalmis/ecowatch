"use client";
import React, { useEffect, useState } from 'react';
const SSEListener = () => {
  const [isClient, setIsClient] = useState(false);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Exit early if isClient is false

    const eventSource = new EventSource('/api/signalr/reconnect?transport=serverSentEvents&groupsToken=qrjacEmB6NkMXp%2Bvk4BYVA7%2B42zK3fyjXUADeEvrnhtIRNQ87MT6QzcJY5pEhPJ9wJNd486a37Qq5hqyOFaHssEctOMvIU6Lfr8vpBxBwlwbIiRXH1EbUSS7O7Uf94SsiyDrR6rJgsvkkSMfReLckg%3D%3D&messageId=d-EA780351-B%2C0%7CBopm%2C0%7CBopn%2C11%7CU%2C6A99&clientProtocol=2.1&connectionToken=gYUSuYj3hsPiVGGmODYOu2cy%2Fxzb0wp1vtgpvEW2F8AkQvcODUBW3OwY3J3G8XtNTeJI37oRM5kvC6kEovgfjorfhoXowrionohwAXPD7XGRDKKf8XfNOyFtQE%2FFoOxW&connectionData=%5B%7B%22name%22%3A%22stocktickermini%22%7D%5D&tid=-');

    eventSource.onmessage = (event) => {
      if (event.data !== 'initialized') {
        const eventData = JSON.parse(event.data);
        setEventData(eventData);
        console.log(eventData)
      }
    };

    eventSource.onerror = (error) => {
      // Handle error if needed
    };

    return () => {
      eventSource.close();
    };
  }, [isClient]); // Make sure to include isClient in the dependency array

  return (
    <div>
      <h2 className="text-center">YATIRIM BABY !</h2>
      {eventData && eventData.M && eventData.M[0] && eventData.M[0].A ? (
        <table>
          <thead>
            <tr>
              <th className="text-center pr-10">YATIRIM</th>
              <th className="text-center pr-10">ALIS FIYATI</th>
              <th className="text-center pr-10">SATIS FIYATI</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(eventData.M[0].A[0]).map((key, index) => (
              <tr key={index}>
                <td className='mx-5'>{eventData.M[0].A[0][key].p}</td>
                <td className='mx-5'>{eventData.M[0].A[0][key].a}</td>
                <td className='mx-5'>{eventData.M[0].A[0][key].s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SSEListener;