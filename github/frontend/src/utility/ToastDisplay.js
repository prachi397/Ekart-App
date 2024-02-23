export const ToastDisplay = (severity, summary, detail, time, toast) => {
    if(toast){
      return toast.current.show({
        severity,
        summary,
        detail,
        life: time,
      });
    }
    
    };
    