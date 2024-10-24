enum StatusCodes {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

enum ResponseCodesPR {
  SUCCESS = 'PR-001',
  NOT_FOUND = 'PR-002',
  INTERNAL_SERVER_ERROR = 'PR-003',
  BAD_REQUEST = 'PR-004',
}

enum ResponseCodesPRP {
  SUCCESS = 'PRP-001',
  NOT_FOUND = 'PRP-002',
  INTERNAL_SERVER_ERROR = 'PRP-003',
  BAD_REQUEST = 'PRP-004',
}

enum ResponseCodesDiscount {
  SUCCESS = 'DIS-001',
  NOT_FOUND = 'DIS-002',
  INTERNAL_SERVER_ERROR = 'DIS-003',
  BAD_REQUEST = 'DIS-004',
}

export const statusCodes = StatusCodes;
export const responseCodesPR = ResponseCodesPR;
export const responseCodesPRP = ResponseCodesPRP;
export const responseCodesDiscount = ResponseCodesDiscount;
