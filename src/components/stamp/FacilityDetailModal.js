import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const FacilityDetailModal = ({ isOpen, facility, onClose, visitedStamp }) => {
    if (!facility) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                        {facility.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* 施設の画像またはスタンプ画像 */}
                    <div className="flex justify-center bg-white rounded-lg p-4 shadow-sm">
                        <div className="relative w-40 h-40">
                            <img
                                src={visitedStamp ? visitedStamp.imageUrl : facility.stampImage}
                                alt={facility.name}
                                className="w-full h-full object-contain rounded-md"
                            />
                        </div>
                    </div>

                    {/* 施設情報 */}
                    <div className="space-y-4 bg-gray-50/80 rounded-lg p-4">
                        {/* ステータス */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">ステータス:</span>
                            {visitedStamp ? (
                                <Badge className="bg-emerald-500 hover:bg-emerald-600">
                                    取得済み ({new Date(visitedStamp.obtainedAt).toLocaleDateString()})
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="text-gray-600 border-gray-300">
                                    未取得
                                </Badge>
                            )}
                        </div>

                        {/* 住所 */}
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-gray-700">住所:</span>
                            <p className="text-sm text-gray-600 ml-4">{facility.address}</p>
                        </div>

                        {/* 県名 */}
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-gray-700">県:</span>
                            <p className="text-sm text-gray-600 ml-4">
                                {facility.prefecture === 'aichi' && '愛知県'}
                                {facility.prefecture === 'gifu' && '岐阜県'}
                                {facility.prefecture === 'mie' && '三重県'}
                                {facility.prefecture === 'shizuoka' && '静岡県'}
                            </p>
                        </div>

                        {/* スタンプ取得範囲 */}
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-gray-700">スタンプ取得可能範囲:</span>
                            <p className="text-sm text-gray-600 ml-4">約{facility.stampRadius}m以内</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FacilityDetailModal;