create database RentaCar
use RentaCar

CREATE TABLE Clientes (
ID_Cliente INT identity(1,1) PRIMARY KEY,
Ced_Cliente int unique not null,
Nombre VARCHAR(100) not null,
Apellido VARCHAR(100) not null,
TipoClienteID INT,
LugarResidenciaID INT,
Direccion VARCHAR(255),
FOREIGN KEY (TipoClienteID) REFERENCES TipoCliente(TipoClienteID),
FOREIGN KEY (LugarResidenciaID) REFERENCES LugarResidencia(LugarResidenciaID),
);

select * from Clientes

-- Insertar datos en la tabla TipoCliente
INSERT INTO TipoCliente (TipoClienteID, Tipo) VALUES 
(1, 'Nacional'),
(2, 'Extranjero');

-- Insertar datos en la tabla LugarResidencia con las provincias de Costa Rica
INSERT INTO LugarResidencia (LugarResidenciaID, Lugar) VALUES 
(1, 'San José'),
(2, 'Alajuela'),
(3, 'Cartago'),
(4, 'Heredia'),
(5, 'Guanacaste'),
(6, 'Puntarenas'),
(7, 'Limón');

ALTER TABLE Clientes
DROP COLUMN NumeroTarjeta;

ALTER TABLE Clientes
ADD contrasena VARCHAR(255) NOT NULL;


create table Tarjetas
(
TarjetaID int identity(1,1) PRIMARY KEY,
Numero varchar(100),
TipoTarjetaID int,
FOREIGN KEY (TipoTarjetaID) REFERENCES TipoTarjeta(TipoTarjetaID),
)
go
CREATE TABLE TipoCliente (
TipoClienteID INT PRIMARY KEY,
Tipo VARCHAR(50)
);


CREATE TABLE LugarResidencia (
LugarResidenciaID INT PRIMARY KEY,
Lugar VARCHAR(100)
);
CREATE TABLE TipoTarjeta (
TipoTarjetaID INT PRIMARY KEY,
Tipo VARCHAR(50)
);


CREATE TABLE Vehiculos (
VehiculoID INT PRIMARY KEY identity(1,1),
TipoVehiculoID INT,
ColorID INT,
CombustibleID INT,
TransmisionID int,
PlacasID int,
ModeloID int,
MarcaID int,
AnoID int,
PuertasID int,
Costos money,
Disponible varchar(5),
FOREIGN KEY (PuertasID) REFERENCES Puertas(PuertasID),
FOREIGN KEY (AnoID) REFERENCES Anos(AnoID),
FOREIGN KEY (MarcaID) REFERENCES Marca(MarcaID),
FOREIGN KEY (ModeloID) REFERENCES Modelo(ModeloID),
FOREIGN KEY (PlacasID) REFERENCES Placas(PlacasID),
FOREIGN KEY (TransmisionID) REFERENCES Transimision(TransmisionID),
FOREIGN KEY (TipoVehiculoID) REFERENCES TipoVehiculo(TipoVehiculoID),
FOREIGN KEY (ColorID) REFERENCES Color(ColorID),
FOREIGN KEY (CombustibleID) REFERENCES Combustible(CombustibleID)
);
ALTER TABLE Vehiculos
ADD ruta_imagen VARCHAR(255);

create table Anos
(
AnoID INT PRIMARY KEY identity(1,1),
Anos int,
)
go
Select * from Anos
create table Puertas
(
PuertasID INT PRIMARY KEY identity(1,1),
Puertas int,
)
go
create table Transimision
(
TransmisionID INT PRIMARY KEY identity(1,1),
Nombre varchar(100)
)
go
create table Placas
(
PlacasID INT PRIMARY KEY identity(1,1),
Numero varchar(100)
)
go
create table Marca
(
MarcaID INT PRIMARY KEY identity(1,1),
Nombre varchar(100)
)
go
create table Modelo
(
ModeloID INT PRIMARY KEY identity(1,1),
Nombre varchar(100)
)
go
CREATE TABLE TipoVehiculo (
TipoVehiculoID INT identity(1,1) PRIMARY KEY,
Tipo VARCHAR(100)
);
CREATE TABLE Color (
ColorID INT identity(1,1) PRIMARY KEY,
Color VARCHAR(50)
);
CREATE TABLE Combustible (
CombustibleID INT identity(1,1) PRIMARY KEY,
Tipo VARCHAR(50)
);
CREATE TABLE Alquileres (
AlquilerID INT PRIMARY KEY,
ID_Cliente INT,
VehiculoID INT,
FechaInicio DATE,
FechaFin DATE,
ID_Seguro int,
MontoTotal DECIMAL(10, 2),
FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID_Cliente),
FOREIGN KEY (VehiculoID) REFERENCES Vehiculos(VehiculoID),
FOREIGN KEY (ID_Seguro) REFERENCES TipoSeguro(ID_Seguro)
);

create table TipoSeguro(
ID_Seguro INT identity(1,1) PRIMARY KEY Not null,
Nombre varchar(100),
Precio money
);