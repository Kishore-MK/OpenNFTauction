"use client";

export async function connectUnisat() {
  try {
    if (typeof (window as any).unisat === 'undefined') {
      throw new Error('Unisat wallet not found');
    }
    
    const accounts = await (window as any).unisat.requestAccounts();
    return accounts[0];
  } catch (error) {
    console.error('Error connecting to Unisat:', error);
    throw error;
  }
}

export async function getBalance(address: string) {
  try {
    const balance = await (window as any).unisat.getBalance();
    return balance;
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
}