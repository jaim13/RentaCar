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

ALTER TABLE Vehiculos
DROP COLUMN Nombre;
CREATE PROCEDURE InsertarAno
    @Ano INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Anos (Anos)
    OUTPUT INSERTED.AnoID
    VALUES (@Ano);
END;

CREATE PROCEDURE InsertarPuertas
    @Puertas INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Puertas (Puertas)
    OUTPUT INSERTED.PuertasID
    VALUES (@Puertas);
END;

CREATE PROCEDURE InsertarTransimision
    @Nombre NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Transimision (Nombre)
    OUTPUT INSERTED.TransmisionID
    VALUES (@Nombre);
END;

CREATE PROCEDURE InsertarPlacas
    @Numero NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Placas (Numero)
    OUTPUT INSERTED.PlacasID
    VALUES (@Numero);
END;

CREATE PROCEDURE InsertarMarca
    @Nombre NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Marca (Nombre)
    OUTPUT INSERTED.MarcaID
    VALUES (@Nombre);
END;

CREATE PROCEDURE InsertarModelo
    @Nombre NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Modelo (Nombre)
    OUTPUT INSERTED.ModeloID
    VALUES (@Nombre);
END;
Select * from Vehiculos
select * from Combustible
CREATE PROCEDURE InsertarTipoVehiculo
    @Tipo NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO TipoVehiculo (Tipo)
    OUTPUT INSERTED.TipoVehiculoID
    VALUES (@Tipo);
END;

CREATE PROCEDURE InsertarColor
    @Color NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Color (Color)
    OUTPUT INSERTED.ColorID
    VALUES (@Color);
END;

CREATE PROCEDURE InsertarCombustible
    @Tipo NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Combustible (Tipo)
    OUTPUT INSERTED.CombustibleID
    VALUES (@Tipo);
END;

CREATE PROCEDURE InsertarVehiculo
    @TipoVehiculoID INT,
    @ColorID INT,
    @CombustibleID INT,
    @TransmisionID INT,
    @PlacasID INT,
    @ModeloID INT,
    @MarcaID INT,
    @AnoID INT,
    @PuertasID INT,
    @Costos VARCHAR(255),
    @Disponible VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Vehiculos (TipoVehiculoID, ColorID, CombustibleID, TransmisionID, PlacasID, ModeloID, MarcaID, AnoID, PuertasID, Costos, Disponible)
    VALUES (@TipoVehiculoID, @ColorID, @CombustibleID, @TransmisionID, @PlacasID, @ModeloID, @MarcaID, @AnoID, @PuertasID, @Costos, @Disponible);
END;
select * from Vehiculos

CREATE PROCEDURE InsertarVehiculoConImagen
    @TipoVehiculoID INT,
    @ColorID INT,
    @CombustibleID INT,
    @TransmisionID INT,
    @PlacasID INT,
    @ModeloID INT,
    @MarcaID INT,
    @AnoID INT,
    @PuertasID INT,
    @Costos DECIMAL(10, 2),
    @Disponible varchar(5),
    @RutaImagen VARCHAR(255)
AS
BEGIN
    INSERT INTO Vehiculos (TipoVehiculoID, ColorID, CombustibleID, TransmisionID, PlacasID, ModeloID, MarcaID, AnoID, PuertasID, Costos, Disponible, ruta_imagen)
    VALUES (@TipoVehiculoID, @ColorID, @CombustibleID, @TransmisionID, @PlacasID, @ModeloID, @MarcaID, @AnoID, @PuertasID, @Costos, @Disponible, @RutaImagen);
END;


CREATE PROCEDURE GetVehiculos
AS
BEGIN
    SELECT 
        V.VehiculoID,
        A.Anos,
        P.Puertas,
        T.Nombre AS Transmision,
        Pl.Numero AS Placas,
        M.Nombre AS Marca,
        Mo.Nombre AS Modelo,
        TV.Tipo AS TipoVehiculo,
        C.Color AS Color,
        Co.Tipo AS Combustible,
        V.Costos,
        V.Disponible,
        V.ruta_imagen
    FROM 
        Vehiculos V
        INNER JOIN Anos A ON V.AnoID = A.AnoID
        INNER JOIN Puertas P ON V.PuertasID = P.PuertasID
        INNER JOIN Transimision T ON V.TransmisionID = T.TransmisionID
        INNER JOIN Placas Pl ON V.PlacasID = Pl.PlacasID
        INNER JOIN Marca M ON V.MarcaID = M.MarcaID
        INNER JOIN Modelo Mo ON V.ModeloID = Mo.ModeloID
        INNER JOIN TipoVehiculo TV ON V.TipoVehiculoID = TV.TipoVehiculoID
        INNER JOIN Color C ON V.ColorID = C.ColorID
        INNER JOIN Combustible Co ON V.CombustibleID = Co.CombustibleID;
END;
