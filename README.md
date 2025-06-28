# Microservices-Task

## Overview
This document provides details of microservices application on Kubernetes using Minikube, ensuring proper service communication and configuration. These services include User, Product, Order, and Gateway Services. Each service has its own endpoints for testing purposes.

---

## 1. Services and Endpoints local testing 

### **User Service**
- **Base URL:** `http://localhost:3000`
- **Endpoints:**
  - **List Users:**  
    ```
    curl http://localhost:3000/users
    ```
    Or open in your browser: [http://localhost:3000/users](http://localhost:3000/users)

---

### **Product Service**
- **Base URL:** `http://localhost:3001`
- **Endpoints:**
  - **List Products:**  
    ```
    curl http://localhost:3001/products
    ```
    Or open in your browser: [http://localhost:3001/products](http://localhost:3001/products)

---

### **Order Service**
- **Base URL:** `http://localhost:3002`
- **Endpoints:**
  - **List Orders:**  
    ```
    curl http://localhost:3002/orders
    ```
    Or open in your browser: [http://localhost:3002/orders](http://localhost:3002/orders)

---

### **Gateway Service**
- **Base URL:** `http://localhost:3003/api`
- **Endpoints:**
  - **Users:**  
    ```
    curl http://localhost:3003/api/users
    ```
  - **Products:**  
    ```
    curl http://localhost:3003/api/products
    ```
  - **Orders:**  
    ```
    curl http://localhost:3003/api/orders
    ```

---

## 2. Instructions how to set up and test K8s using miniKube
1. Start Minikube (if not already running):
   ```bash
   minikube start
   ```
2. Set the namespace (if it doesn't exist):
    ```bash
    kubectl create namespace rik8s
    ````
3. Apply the deployment manifest:

    ```bash
    kubectl apply -f .\user-deployments.yaml
    kubectl apply -f .\product-deployments.yaml 
    kubectl apply -f .\order-deployments.yaml
    kubectl apply -f .\gateway-deployments.yaml
    ````
4. Apply the service manifest:

    ```bash
    kubectl apply -f .\user-service.yaml
    kubectl apply -f .\product-service.yaml
    kubectl apply -f .\order-service.yaml
    kubectl apply -f .\gateway-service.yaml   
    ````
5. Check the status of your deployment ,services and pods :
    ```bash
    # add -o wide for details like kubectl get deployments -n rik8s -o wide
    kubectl get deployments -n rik8s
    kubectl get pods -n rik8s
    kubectl get svc -n rik8s
    
    ```
6. Expose or access the user / product / order service :
  - If using Ingress, make sure your Ingress is applied and configured.
    Or, port-forward for local testing:

    ```bash
    kubectl port-forward svc/user-service 3000:3000 -n rik8s
    kubectl port-forward svc/product-service 3001:3001 -n rik8s
    kubectl port-forward svc/order-service  3002:3002 -n rik8s
    ```
7. Expose the Gateway Service for Local Testing
    Since you are using Minikube, use `minikube service` to access the LoadBalancer service:
    ```bash
    minikube service gateway-service -n rik8s
    ``` 
8. Run `minikube dashboard` to get information using UI as well
## 3. Demo

1. k8s Services details 
![alt text](Submission/screenshots/k8s_avilability_status.png)

2. All services are up and running including gateway API . 
 ![alt text](Submission/screenshots/2_microservices_run.png)
 - run `minikube service {details}`
  ![alt text](Submission/screenshots/1_Gateway_service.png)
 - Gateway api testing using `curl`
  ![alt text](Submission/screenshots/3_gateway_services.png)

**Notes**
>The EXTERNAL-IP for your gateway-service is showing <pending> because we are using the LoadBalancer service type, but  Kubernetes cluster (likely Minikube or a local setup) does not have a cloud load balancer integration.

>Change to NodePort Edit your service YAML to use ```NodePort``` instead:
```yaml
# ...existing code...
spec:
  type: NodePort
  selector:
    app: gateway-service
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3003
    nodePort: 31417 # optional, or let Kubernetes assign
# ...existing code...
```
Then access it at : `minikube ip`
```bash
http://<minikube-ip>:31417/
```
