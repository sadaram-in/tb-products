

--- Table: Customers Table
create table Customers (
    id uuid not null default gen_random_uuid (),
    user_id uuid not null,
    phone text not null,
    email text null,
    first_name text null,
    last_name text null,
    profile_pic_url text null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    is_email_verified boolean null default false,
    constraint customers_pkey primary key (id),
    constraint customers_phone_key unique (phone),
    constraint customers_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;



-- Table: Products
CREATE TABLE Products (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    changeLog JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    effective_from DATE,
    effective_to DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Features
CREATE TABLE Features (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    effective_from DATE,
    effective_to DATE NULL
);

-- Table: ProductFeature (Association Table)
CREATE TABLE ProductFeature (
    id UUID PRIMARY KEY,
    featureId UUID NOT NULL REFERENCES Features(id),
    productId UUID NOT NULL REFERENCES Products(id)
);

-- Table: Subscription
CREATE TABLE Subscription (
    id UUID PRIMARY KEY,
    userId UUID NOT NULL REFERENCES Customers(id),
    productId UUID NOT NULL REFERENCES Products(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    auto_renewal BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Invoice
CREATE TABLE Invoice (
    id UUID PRIMARY KEY,
    userId UUID NOT NULL REFERENCES Customers(id),
    subscriptionId UUID NOT NULL REFERENCES Subscription(id),
    payment_gateway VARCHAR(255),
    razorpayId UUID,
    amount DECIMAL(10, 2),
    billing_start_date DATE,
    billing_end_date DATE,
    payment_confirmation BOOLEAN DEFAULT FALSE
);

-- Table: Razor_pay_details
CREATE TABLE Razor_pay_details (
    UniqueID UUID PRIMARY KEY,
    razorpay_order_id VARCHAR(255),
    currency VARCHAR(3),
    receipt VARCHAR(255)
);

-- Table: ProductPricing
CREATE TABLE ProductPricing (
    id UUID PRIMARY KEY,
    productId UUID NOT NULL REFERENCES Products(id),
    price DECIMAL(10, 2),
    currency VARCHAR(3),
    is_active BOOLEAN DEFAULT TRUE,
    effective_from DATE,
    effective_to DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
