import React from 'react'
import {Button,notification} from 'antd'
import axios from '../../../config/axios';
function ExportExcel() {
    const onClickDownloadLand = () => {
        axios.get(`/api/download/land`,{
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
          }).then((result) => {
            const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            //   let fileUrl = URL.createObjectURL(blob);
              const link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = `LandFromSystemBest.xlsx`
              link.click()
            //   window.open(fileUrl,'_blank');
        }).catch((err) => {
            notification.error({message:'Fail download'})
        });
    }
    const DownloadDistrict = () => {
        axios.get(`api/download/district`,{
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
          }).then((result) => {
            const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
              const link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = `DistrictFromSystemBest.xlsx`
              link.click()
        }).catch((err) => {
            notification.error({message:'Fail download'})
        });
    }
    const DownloadUsefulLand =()=>{
        axios.get(`/api/download/usefulland`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `UsefulLand.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadEmployee = () => {
        axios.get(`/api/download/employee`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `Employee.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadRateLand = () => {
        axios.get(`/api/download/rateland`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `PriceThanaruk.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadBuilding =()=>{
        axios.get(`/api/download/building`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `building.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadRateBuilding =()=>{
        axios.get(`/api/download/ratebuilding`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `RateBuilding.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadLiveType =()=>{
        axios.get(`/api/download/live`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `LiveType.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadOtherType = () => {
        axios.get(`/api/download/other`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `OtherType.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadEmptyType =()=>{
        axios.get(`/api/download/empty`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `EmptyType.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadFarmType =()=>{
          axios.get(`/api/download/farm`,{
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
          }).then((result) => {
            const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
              const link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = `FarmType.xlsx`
              link.click()
        }).catch((err) => {
            notification.error({message:'Fail download'})
        });
    }
    const downloadTaxGroup = () => {
        axios.get(`/api/download/taxgroup`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `TaxGroup.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadCustomerHasTax =()=>{
        axios.get(`/api/download/customerhastax`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `CustomerHasTax.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadCustomer =()=>{
        axios.get(`/api/download/customer`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `Customers.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadUsefulRoom =()=>{
        axios.get(`/api/download/usefulroom`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `UsefulRoom.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    const downloadCondo =()=>{
          axios.get(`/api/download/condo`,{
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
          }).then((result) => {
            const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
              const link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = `Condo.xlsx`
              link.click()
        }).catch((err) => {
            notification.error({message:'Fail download'})
        });
    }
    const downloadRoom =()=>{
          axios.get(`/api/download/room`,{
            responseType: 'arraybuffer',
            headers: {
              'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
          }).then((result) => {
            const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
              const link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = `Room.xlsx`
              link.click()
        }).catch((err) => {
            notification.error({message:'Fail download'})
        });
    }
    const downloadBuildOnUseful =()=>{
        axios.get(`/api/download/builduseful`,{
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }).then((result) => {
          const blob = new Blob([result.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `BuildOnUsefulLand.xlsx`
            link.click()
      }).catch((err) => {
          notification.error({message:'Fail download'})
      });
    }
    return (
        <div>
            <Button onClick={onClickDownloadLand}>DownLoadLand</Button>
            <Button onClick={DownloadDistrict}>Download District</Button>
            <Button onClick={DownloadUsefulLand}>Download Useful Land</Button>
            <Button onClick={downloadEmployee}>DownloadEmployee</Button>
            <Button onClick={downloadBuilding}>DownloadBuilding</Button>
            <Button onClick={downloadBuildOnUseful}>Download BuildOnUseful</Button>
            <Button onClick={downloadRateBuilding}>downloadRateBuilding</Button>
            <Button onClick={downloadRateLand}>Download PriceThanaruk</Button>
            <Button onClick={downloadLiveType}>Download TypeLive</Button>
            <Button onClick={downloadOtherType}>Download OtherType</Button>
            <Button onClick={downloadEmptyType}>Download EmptyType</Button>
            <Button onClick={downloadFarmType}>Download FarmType</Button>
            <Button onClick={downloadTaxGroup}>Download TaxGroup</Button>
            <Button onClick={downloadCustomerHasTax}>Dowload CustomerHasTax</Button>
            <Button onClick={downloadCustomer}>DownloadCustomers</Button>
            <Button onClick={downloadCondo}>Download Condo</Button>
            <Button onClick={downloadRoom}>DownloadRoom</Button>
            <Button onClick={downloadUsefulRoom}>Download UsefulRoom</Button>
        </div>
    )
}

export default ExportExcel
